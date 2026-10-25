import React, { useState, useRef, useId } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Loader2, 
  Sparkles 
} from 'lucide-react';
import { uploadImageToCloudinary, getStoredCloudinaryConfig } from '../../services/cloudinary';

interface CloudinaryUploaderProps {
  images: string[];
  onChangeImages: (images: string[]) => void;
  onOpenSettings: () => void;
}

export const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  images,
  onChangeImages,
  onOpenSettings,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);
  const [lastUploadWasLive, setLastUploadWasLive] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = useId();

  const config = getStoredCloudinaryConfig();
  const isCloudinaryActive = Boolean(config.cloudName && config.uploadPreset);

  const handleFiles = async (fileList: FileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) {
      setUploadStatusMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStatusMsg('Preparing upload pipeline...');

    const newUploadedUrls: string[] = [];
    let hadSimulated = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadStatusMsg(`Processing ${file.name} (${i + 1}/${files.length})...`);

      const result = await uploadImageToCloudinary(file, config, (percent) => {
        setUploadProgress(percent);
      });

      if (result.success && result.url) {
        newUploadedUrls.push(result.url);
        if (result.isSimulated) {
          hadSimulated = true;
        }
      } else {
        setUploadStatusMsg(`Upload error: ${result.error || 'Failed to upload image'}`);
      }
    }

    if (newUploadedUrls.length > 0) {
      onChangeImages([...images, ...newUploadedUrls]);
      setLastUploadWasLive(!hadSimulated);
      setUploadStatusMsg(
        hadSimulated
          ? 'Image processed in safe local preview mode (Cloudinary keys optional).'
          : 'Image successfully uploaded to Cloudinary CDN!'
      );
    }

    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChangeImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
          Product Images ({images.length}/5)
        </label>

        {/* Live Cloudinary vs Demo indicator */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-emerald-400 transition-colors"
        >
          {isCloudinaryActive ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Cloudinary: <strong className="font-mono">{config.cloudName}</strong>
            </span>
          ) : (
            <span className="text-amber-400/90 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Demo Uploader (Click to configure)
            </span>
          )}
        </button>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
          isDragging
            ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
            : 'border-slate-700 bg-slate-950/60 hover:border-emerald-500/60 hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          id={fileInputId}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files);
            }
          }}
        />

        {isUploading ? (
          <div className="py-3 flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            <p className="text-xs font-semibold text-slate-200">
              Uploading {uploadProgress > 0 ? `${uploadProgress}%` : ''}
            </p>
            {uploadProgress > 0 && (
              <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Drag and drop your photos here, or <span className="text-emerald-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Supports PNG, JPG, WEBP up to 10MB • Auto-optimized delivery via Cloudinary
              </p>
            </div>
          </>
        )}
      </div>

      {/* Status feedback message */}
      {uploadStatusMsg && (
        <div
          className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between border ${
            lastUploadWasLive === true
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : lastUploadWasLive === false
              ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {lastUploadWasLive === true ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            {uploadStatusMsg}
          </span>
          <button
            type="button"
            onClick={() => setUploadStatusMsg(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-md"
            >
              <img
                src={url}
                alt={`Uploaded ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white transition-colors opacity-90 group-hover:opacity-100"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-950">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
