import React from 'react';

export default function ContentBlock({ title, children }) {
  return (
    <div className="prose dark:prose-invert max-w-none mb-12">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        {title}
      </h2>
      <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
}