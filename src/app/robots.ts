import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rizkillahramanda.my.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
