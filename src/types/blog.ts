// Sanity blog post type
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  category: string;
  publishedAt: string;
  readingTime?: number;
  body?: any[]; // Portable Text blocks
}

// Frontend blog post type (compatible with existing components)
export interface BlogPost {
  slug: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  category: string;
}
