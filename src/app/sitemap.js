export default function sitemap() {
  const formats = ['jpg', 'png', 'webp', 'gif', 'bmp'];
  const routes = [];

  // Generate cross-product of formats
  formats.forEach(from => {
    formats.forEach(to => {
      if (from !== to) {
        routes.push({
          url: `https://yourdomain.com/${from}-to-${to}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    });
  });

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...routes,
  ];
}