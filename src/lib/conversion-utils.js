import { FORMATS } from './constants';

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const convertImageClientSide = async (file, settings) => {
  const { format, quality, width, height, keepAspectRatio } = settings;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let targetWidth = width || img.width;
      let targetHeight = height || img.height;

      if (keepAspectRatio && width && !height) {
        const ratio = img.height / img.width;
        targetHeight = targetWidth * ratio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      const ctx = canvas.getContext('2d');
      
      // Handle transparent backgrounds for JPG (make them white)
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Canvas export
      const targetMime = format;
      // Quality only applies to jpeg and webp
      const q = (targetMime === 'image/jpeg' || targetMime === 'image/webp') ? quality : undefined;

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Canvas to Blob failed'));
        resolve(blob);
      }, targetMime, q);
    };
    
    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });
};