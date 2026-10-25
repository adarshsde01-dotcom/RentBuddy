import { CloudinaryConfig } from '../types/rental';

// Default configuration with safe fallback
const STORAGE_KEY = 'rentloop_cloudinary_config';

export const getStoredCloudinaryConfig = (): CloudinaryConfig => {
  const envCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const envUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
  const envApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || '';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.cloudName && parsed.uploadPreset) {
        return {
          cloudName: parsed.cloudName,
          uploadPreset: parsed.uploadPreset,
          apiKey: parsed.apiKey || envApiKey,
          isCustomConfigured: true,
        };
      }
    }
  } catch (e) {
    console.error('Failed to read stored Cloudinary config', e);
  }

  return {
    cloudName: envCloudName,
    uploadPreset: envUploadPreset,
    apiKey: envApiKey,
    isCustomConfigured: Boolean(envCloudName && envUploadPreset),
  };
};

export const saveCloudinaryConfig = (config: Partial<CloudinaryConfig>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Cloudinary config', e);
  }
};

export interface TransformationOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'thumb' | 'fit' | 'scale' | 'pad';
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:eco';
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
  gravity?: 'auto' | 'face' | 'center';
  blur?: number;
}

/**
 * Transforms Cloudinary URLs with dynamic optimizations (auto format, quality, dimensions).
 * Gracefully handles non-Cloudinary fallback images (like Unsplash).
 */
export const getOptimizedImageUrl = (
  imageUrl: string,
  options: TransformationOptions = {}
): string => {
  if (!imageUrl) return '';

  // Check if it is a Cloudinary URL
  if (imageUrl.includes('res.cloudinary.com')) {
    const {
      width = 800,
      height,
      crop = 'fill',
      quality = 'auto',
      format = 'auto',
      gravity = 'auto',
      blur,
    } = options;

    const parts = imageUrl.split('/upload/');
    if (parts.length === 2) {
      const transformations = [
        `c_${crop}`,
        `w_${width}`,
        height ? `h_${height}` : null,
        `q_${quality}`,
        `f_${format}`,
        gravity ? `g_${gravity}` : null,
        blur ? `e_blur:${blur}` : null,
      ]
        .filter(Boolean)
        .join(',');

      return `${parts[0]}/upload/${transformations}/${parts[1]}`;
    }
  }

  // If Unsplash, append Unsplash dynamic resizing parameters
  if (imageUrl.includes('images.unsplash.com')) {
    const url = new URL(imageUrl);
    if (options.width) url.searchParams.set('w', options.width.toString());
    if (options.height) url.searchParams.set('h', options.height.toString());
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', options.crop === 'thumb' ? 'crop' : 'max');
    url.searchParams.set('q', '80');
    return url.toString();
  }

  return imageUrl;
};

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * When keys are not yet configured, provides an interactive simulated preview mode.
 */
export const uploadImageToCloudinary = async (
  file: File,
  config?: CloudinaryConfig,
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; url: string; error?: string; isSimulated?: boolean }> => {
  const activeConfig = config || getStoredCloudinaryConfig();

  // If not configured, provide high-fidelity local reader with clear status
  if (!activeConfig.cloudName || !activeConfig.uploadPreset) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      if (onProgress) onProgress(30);

      reader.onload = (e) => {
        if (onProgress) onProgress(100);
        resolve({
          success: true,
          url: e.target?.result as string,
          isSimulated: true,
        });
      };
      reader.onerror = () => {
        resolve({
          success: false,
          url: '',
          error: 'Failed to read local file.',
        });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', activeConfig.uploadPreset);
    formData.append('folder', 'rentloop_products');

    const url = `https://api.cloudinary.com/v1_1/${activeConfig.cloudName}/image/upload`;

    return await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: CloudinaryUploadResult = JSON.parse(xhr.responseText);
            resolve({
              success: true,
              url: data.secure_url,
              isSimulated: false,
            });
          } catch {
            resolve({
              success: false,
              url: '',
              error: 'Failed to parse Cloudinary response.',
            });
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            resolve({
              success: false,
              url: '',
              error: errorData.error?.message || `Cloudinary upload failed with status ${xhr.status}`,
            });
          } catch {
            resolve({
              success: false,
              url: '',
              error: `Cloudinary upload failed with HTTP status ${xhr.status}`,
            });
          }
        }
      };

      xhr.onerror = () => {
        resolve({
          success: false,
          url: '',
          error: 'Network error communicating with Cloudinary API.',
        });
      };

      xhr.send(formData);
    });
  } catch (err: any) {
    return {
      success: false,
      url: '',
      error: err.message || 'Unknown upload exception',
    };
  }
};
