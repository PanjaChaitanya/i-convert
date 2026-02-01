import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function DropzoneArea({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ease-in-out
        ${isDragActive 
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 scale-[1.01]' 
          : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-brand-100 dark:bg-brand-900/50 rounded-full text-brand-600 dark:text-brand-400">
          <Upload size={32} />
        </div>
        <div>
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-200">
            {isDragActive ? "Drop files now" : "Click or Drag images here"}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Support for JPG, PNG, WEBP, GIF, SVG, BMP
          </p>
        </div>
      </div>
    </div>
  );
}