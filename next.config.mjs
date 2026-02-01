/** @type {import('next').NextConfig} */
const nextConfig = {
  // critical for performance - ensures we don't ship unnecessary react code
  reactStrictMode: true, 
  images: {
    // If you plan to display uploaded images via Next/Image (optional)
    domains: [], 
  },
  // Ensure we can handle large payloads if using the server API
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;