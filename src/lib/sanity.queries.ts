import {defineQuery} from 'groq';

/**
 * Query all published blog posts, ordered by publish date (newest first)
 * Used for the blog listing page
 */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    category,
    publishedAt,
    readingTime
  }
`);

/**
 * Query a single blog post by slug
 * Used for individual blog post pages
 */
export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    category,
    publishedAt,
    readingTime,
    body
  }
`);

/**
 * Query related posts by category (excluding current post)
 * Used to show related posts at the bottom of blog post pages
 */
export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && category == $category && slug.current != $slug && defined(publishedAt)] 
  | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    category,
    publishedAt,
    readingTime
  }
`);

/**
 * Query all unique categories that have published posts
 * Used for the category filter
 */
export const CATEGORIES_QUERY = defineQuery(`
  array::unique(*[_type == "post" && defined(publishedAt)].category)
`);

/**
 * Query posts filtered by category and search term
 */
export const FILTERED_POSTS_QUERY = defineQuery(`
  *[_type == "post" 
    && defined(publishedAt)
    && ($category == "all" || category == $category)
    && ($search == "" || 
        title match $search + "*" || 
        excerpt match $search + "*" || 
        category match $search + "*")
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt
    },
    category,
    publishedAt,
    readingTime
  }
`);
