import React, { useState } from 'react';
import { X, Cloud, Key, CheckCircle2, ShieldAlert, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';
import { CloudinaryConfig } from '../../types/rental';
import { getStoredCloudinaryConfig, saveCloudinaryConfig } from '../../services/cloudinary';

interface CloudinarySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: (config: CloudinaryConfig) => void;
}

export const CloudinarySettingsModal: React.FC<CloudinarySettingsModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
}) => {
  const currentConfig = getStoredCloudinaryConfig();
  const [cloudName, setCloudName] = useState(currentConfig.cloudName || '');
  const [uploadPreset, setUploadPreset] = useState(currentConfig.uploadPreset || '');
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CloudinaryConfig = {
      cloudName: cloudName.trim(),
      uploadPreset: uploadPreset.trim(),
      apiKey: apiKey.trim(),
      isCustomConfigured: Boolean(cloudName.trim() && uploadPreset.trim()),
    };
    saveCloudinaryConfig(updated);
    onConfigUpdated(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const isConfigured = Boolean(cloudName.trim() && uploadPreset.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 text-emerald-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Cloudinary Image Pipeline</h2>
              <p className="text-xs text-slate-400">Manage real-time media uploads, transformations & storage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status indicator */}
        <div className="my-5 p-3.5 rounded-xl border flex items-start gap-3 bg-slate-800/60 border-slate-700">
          {isConfigured ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-400">Cloudinary Connected & Active</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Direct unsigned uploads are enabled for cloud name <span className="font-mono text-emerald-300 font-bold">{cloudName}</span> using preset <span className="font-mono text-emerald-300 font-bold">{uploadPreset}</span>.
                </p>
              </div>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-300">Simulated Upload Mode (Safe Demo Active)</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Currently in high-fidelity demo mode. Image uploads use instantaneous browser client readers with image transformations. You can plug in your Cloudinary keys below or in your <code className="text-amber-200">.env</code> file anytime!
                </p>
              </div>
            </>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Cloudinary Cloud Name
            </label>
            <input
              type="text"
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
              placeholder="e.g. demo or your-cloud-name"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Unsigned Upload Preset
            </label>
            <input
              type="text"
              value={uploadPreset}
              onChange={(e) => setUploadPreset(e.target.value)}
              placeholder="e.g. rentloop_preset"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Upload presets are safe for client-side uploads. Never share your secret API key.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Optional API Key (Public)
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="e.g. 123456789012345 (Optional)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {showGuide ? 'Hide quick setup instructions' : 'How do I create a free Cloudinary upload preset? (30 sec)'}
            </button>

            {showGuide && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p className="font-semibold text-white">3-Step Free Cloudinary Setup:</p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                  <li>Log into <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-0.5">cloudinary.com <ExternalLink className="w-3 h-3" /></a> (free tier has 25GB monthly storage).</li>
                  <li>Go to <strong>Settings</strong> &rarr; <strong>Upload</strong> &rarr; scroll down to <strong>Upload presets</strong>.</li>
                  <li>Click <strong>Add upload preset</strong>, select <strong>Signing Mode: Unsigned</strong>, name it <code className="text-emerald-300">rentloop_preset</code>, and click <strong>Save</strong>.</li>
                </ol>
                <p className="text-slate-400 pt-1">
                  You can also add these in a <code className="text-emerald-300">.env.local</code> file as <code className="text-emerald-300">VITE_CLOUDINARY_CLOUD_NAME</code> and <code className="text-emerald-300">VITE_CLOUDINARY_UPLOAD_PRESET</code>.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  Saved!
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
