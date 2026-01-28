import { MetadataRoute } from 'next';
import { siteMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  };
}
