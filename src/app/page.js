import Link from 'next/link';
import Converter from '@/components/Converter';
import { FORMATS } from '@/lib/constants';

export const metadata = {
  title: 'Free Image Converter | Convert JPG, PNG, WEBP, HEIC Online',
  description: 'Secure, browser-based image converter. Convert images instantly without uploading to a server. Supports JPG, PNG, WEBP, SVG, and more.',
};

export default function Home() {
  // Generate a list of popular conversions for SEO links
  const formats = Object.keys(FORMATS).map(k => FORMATS[k].ext.toUpperCase());
  const conversions = [];
  formats.forEach(from => {
    formats.forEach(to => {
      if(from !== to) conversions.push({ from, to });
    });
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent pb-2">
          Universal Image Converter
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Convert unlimited images for free. 
          <span className="font-semibold text-brand-600 block mt-2">
            No Uploads. No Wait. 100% Private.
          </span>
        </p>
      </section>

      {/* Main App */}
      <Converter />

      {/* SEO Internal Linking Grid - CRITICAL FOR RANKING */}
      <section className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          Popular Conversions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {conversions.slice(0, 24).map((c, i) => (
            <Link 
              key={i}
              href={`/${c.from.toLowerCase()}-to-${c.to.toLowerCase()}`}
              className="text-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-600 transition text-sm"
            >
              {c.from} to {c.to}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}