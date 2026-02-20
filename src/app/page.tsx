'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        console.log('[Homepage] Loading posts from API...');
        
        const response = await fetch('/api/blog/posts', {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`);
        }

        const data = await response.json();
        console.log(`[Homepage] Loaded ${data.posts.length} posts from API`);
        
        // Format dates and get 6 most recent posts
        const formatted = data.posts
          .slice(0, 6)
          .map((post: any) => ({
            ...post,
            date: new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }));
        
        setFeaturedPosts(formatted);
      } catch (err: any) {
        console.error('[Homepage] Error loading posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <main className={styles.homepage}>
      <Hero />
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Latest From Our Blog</h2>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              Loading blog posts...
            </p>
          ) : error ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#d32f2f' }}>
              Error loading posts: {error}
            </p>
          ) : featuredPosts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <>
              <div className={styles.featuredGrid}>
                {featuredPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
              <div className={styles.viewAllContainer}>
                <Link href="/blog" className={styles.viewAllButton}>
                  View All Posts →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
