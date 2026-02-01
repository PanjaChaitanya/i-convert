'use client';

import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { convertImageClientSide } from '@/lib/conversion-utils';
import { FORMATS } from '@/lib/constants';

// Import the separated components
import DropzoneArea from './DropzoneArea';
import FileList from './FileList';
import SettingsPanel from './SettingsPanel';
import Button from '@/components/ui/Button';

export default function Converter({ defaultFrom, defaultTo }) {
  const [files, setFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  // Default to PNG if not provided
  const [targetFormat, setTargetFormat] = useState(defaultTo || 'image/png'); 
  const [quality, setQuality] = useState(0.8);
  
  const onDrop = useCallback(acceptedFiles => {
    setFiles(prev => [
      ...prev, 
      ...acceptedFiles.map(f => Object.assign(f, { status: 'idle' }))
    ]);
  }, []);

  const handleConvert = async () => {
    setIsConverting(true);
    const zip = new JSZip();
    
    // Process queue
    const processedFiles = await Promise.all(files.map(async (file) => {
      try {
        // Update status to processing
        setFiles(prev => prev.map(f => f === file ? { ...f, status: 'processing' } : f));

        const blob = await convertImageClientSide(file, { format: targetFormat, quality });
        const ext = FORMATS[targetFormat].ext;
        const newName = file.name.replace(/\.[^/.]+$/, "") + `.${ext}`;
        
        zip.file(newName, blob);
        
        return { ...file, status: 'done', outputBlob: blob, outputName: newName };
      } catch (e) {
        console.error(e);
        return { ...file, status: 'error' };
      }
    }));

    setFiles(processedFiles);
    
    if (processedFiles.filter(f => f.status === 'done').length > 0) {
        if (processedFiles.length === 1 && processedFiles[0].status === 'done') {
            saveAs(processedFiles[0].outputBlob, processedFiles[0].outputName);
        } else {
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "converted_images.zip");
        }
    }
    
    setIsConverting(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
      
      {/* Settings Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <SettingsPanel 
          targetFormat={targetFormat} 
          setTargetFormat={setTargetFormat}
          quality={quality}
          setQuality={setQuality}
        />
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8">
        <DropzoneArea onDrop={onDrop} />
        
        <FileList 
          files={files} 
          onRemove={(index) => setFiles(files.filter((_, i) => i !== index))} 
        />

        {files.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleConvert}
              isLoading={isConverting}
              variant="primary"
              className="w-full md:w-auto"
            >
              Convert {files.length} {files.length === 1 ? 'Image' : 'Images'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}