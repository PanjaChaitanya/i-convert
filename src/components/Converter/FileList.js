import React from 'react';
import { Trash2, CheckCircle, AlertCircle, FileImage } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';

export default function FileList({ files, onRemove }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="space-y-3 mt-6">
      {files.map((file, idx) => (
        <div 
          key={`${file?.name ?? 'file'}-${idx}`}
          className="group flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            {/* Thumbnail Preview */}
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-600">
              {file?.type?.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="prev" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <FileImage size={20} />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate pr-4">
                {file?.name ?? 'Unknown file'}
              </p>
              {typeof file?.size === 'number' && (
                <p className="text-xs text-slate-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              )}
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center gap-3 pl-2 flex-shrink-0">
            {file?.status === 'processing' && <Spinner className="text-brand-600" />}
            {file?.status === 'done' && <CheckCircle size={20} className="text-green-500" />}
            {file?.status === 'error' && <AlertCircle size={20} className="text-red-500" />}
            
            <button 
              onClick={() => onRemove(idx)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              title="Remove file"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}