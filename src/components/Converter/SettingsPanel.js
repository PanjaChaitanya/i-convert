import React from 'react';
import { FORMATS } from '@/lib/constants';

export default function SettingsPanel({ targetFormat, setTargetFormat, quality, setQuality }) {
  const showQualitySlider = targetFormat === 'image/jpeg' || targetFormat === 'image/webp';

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
        
        {/* Format Selection */}
        <div className="w-full md:w-1/3">
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
            Convert To
          </label>
          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          >
            {Object.entries(FORMATS).map(([mime, data]) => (
              <option key={mime} value={mime}>
                {data.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Slider */}
        {showQualitySlider && (
          <div className="w-full md:w-2/3">
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold uppercase text-slate-500">Quality</label>
              <span className="text-xs font-mono text-brand-600">{Math.round(quality * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}