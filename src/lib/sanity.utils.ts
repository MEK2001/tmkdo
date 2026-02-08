import {SanityPost, BlogPost} from '@/types/blog';
import {urlFor} from './sanity.image';

/**
 * Transform Sanity post data to format expected by existing components
 * This keeps components unchanged while integrating Sanity CMS
 */
export function transformSanityPost(post: SanityPost): BlogPost {
  return {
    slug: post.slug,
    image: urlFor(post.coverImage).width(800).height(600).url(),
    date: new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: post.readingTime ? `${post.readingTime} min read` : '5 min read',
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
  };
}
