import { MetadataRoute } from 'next';
import { siteMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

// Blog post data (same as in [slug]/page.tsx)
const blogPosts = [
  {
    slug: 'minimalist-living-room',
    date: 'January 15, 2026',
  },
  {
    slug: 'decluttering-guide',
    date: 'January 10, 2026',
  },
  {
    slug: 'natural-materials',
    date: 'January 5, 2026',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = blogPosts.map((post) => ({
    url: `${siteMetadata.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteMetadata.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteMetadata.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteMetadata.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
