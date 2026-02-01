import Converter from '@/components/Converter';
import { FORMATS } from '@/lib/constants';

// Helper to get MIME type from extension (e.g., 'svg' -> 'image/svg+xml')
function getMimeFromExt(ext) {
  const formatKey = Object.keys(FORMATS).find(
    key => FORMATS[key].ext === ext.toLowerCase()
  );
  return formatKey || `image/${ext.toLowerCase()}`;
}

// Validate slug format (e.g., "jpg-to-png")
function parseSlug(slug) {
  if (!slug || typeof slug !== 'string') return null;

  const parts = slug.split('-to-');
  if (parts.length !== 2) return null;

  const from = parts[0].toLowerCase();
  const to = parts[1].toLowerCase();

  // Validate against extensions in your constants
  const validExts = Object.values(FORMATS).map(f => f.ext);

  if (!validExts.includes(from) || !validExts.includes(to)) {
    return null;
  }

  return {
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    fromExt: from,
    toExt: to
  };
}

export async function generateMetadata({ params }) {
  // AWAIT the params here for Next.js 15+
  const resolvedParams = await params;
  const data = parseSlug(resolvedParams.slug);
  
  if (!data) return {};

  return {
    title: `Convert ${data.from} to ${data.to} Online - Free & Unlimited`,
    description: `Best free online ${data.from} to ${data.to} converter. Bulk convert ${data.from} images to ${data.to} instantly in your browser. No registration required.`,
    alternates: {
      canonical: `https://yourdomain.com/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${data.from} to ${data.to} Converter`,
      description: 'Drag, drop, and convert instantly.',
    }
  };
}

// Make the component ASYNC and AWAIT params
export default async function DynamicConverterPage({ params }) {
  const resolvedParams = await params;
  const data = parseSlug(resolvedParams.slug);
  
  if (!data) {
    return <div className="text-center p-20 text-xl font-semibold text-slate-500">Invalid Conversion Route</div>;
  }

  // Get the correct MIME type for the converter component
  const targetMimeType = getMimeFromExt(data.toExt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${data.from} to ${data.to} Converter`,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Convert <span className="text-brand-600">{data.from}</span> to{' '}
          <span className="text-purple-600">{data.to}</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Fast, secure, and high-quality image conversion. Drop your {data.from} files below to start.
        </p>
      </section>

      {/* Converter Tool */}
      <Converter
        defaultFrom={data.from}
        defaultTo={targetMimeType}
      />

      {/* SEO Content Block */}
      <article className="prose lg:prose-xl mx-auto mt-20 dark:prose-invert">
        <h2>How to convert {data.from} to {data.to}?</h2>
        <ol>
          <li>Upload your <strong>{data.from}</strong> file by clicking the upload area.</li>
          <li>Select <strong>{data.to}</strong> as the output format.</li>
          <li>Click "Convert" and download your file instantly.</li>
        </ol>
        
        <h2>Why use our {data.from} to {data.to} tool?</h2>
        <ul>
          <li><strong>Privacy First:</strong> Images are processed in your browser.</li>
          <li><strong>Zero Quality Loss:</strong> Advanced compression algorithms.</li>
          <li><strong>Batch Processing:</strong> Convert hundreds of images at once.</li>
        </ul>
      </article>
    </div>
  );
}