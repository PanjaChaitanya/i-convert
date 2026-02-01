import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Free Image Converter | Convert JPG, PNG, WEBP Online',
  description: 'Fast, free, and secure online image converter. Batch convert JPG to PNG, WEBP to JPG, and more without uploading to a server.',
  verification: {
    google: 'YOUR_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
        <nav className="border-b dark:border-slate-800 p-4 sticky top-0 bg-white/80 backdrop-blur-md z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
              i-Convert
            </h1>
          </div>
        </nav>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="border-t dark:border-slate-800 p-8 text-center text-slate-500 text-sm mt-12">
          <p>© {new Date().getFullYear()} ImgConvert. All conversions happen in your browser.</p>
        </footer>
      </body>
    </html>
  );
}