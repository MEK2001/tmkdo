import {Suspense} from 'react';
import SkeletonCard from '@/components/SkeletonCard';
import BlogContentClient from './BlogContentClient';
import styles from './page.module.css';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function BlogPage() {
  // Fetch blog posts from Sanity with caching
  const {client} = await import('@/lib/sanity.client');
  const {POSTS_QUERY} = await import('@/lib/sanity.queries');
  const {transformSanityPost} = await import('@/lib/sanity.utils');

  const sanityPosts = await client.fetch(
    POSTS_QUERY,
    {},
    {
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ['posts'], // Tag for on-demand revalidation
      },
    }
  );
  const posts = sanityPosts.map(transformSanityPost);

  return (
    <main className={styles.blogPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Our Blog</h1>
          <p className={styles.pageDescription}>
            Explore our latest articles on minimalist living, home decor, and intentional design.
            Search or filter to find exactly what you need.
          </p>
        </header>

        <Suspense
          fallback={
            <div className={styles.blogGrid}>
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <BlogContentClient posts={posts} />
        </Suspense>
      </div>
    </main>
  );
}
