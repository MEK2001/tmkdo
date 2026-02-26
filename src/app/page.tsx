'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
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
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
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
        
        // Format dates
        const formatted = data.posts.map((post: any) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        
        setAllPosts(formatted);
      } catch (err: any) {
        console.error('[Homepage] Error loading posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Group posts by category
  const categorizedPosts = {
    'Living Room': allPosts.filter(post => post.category === 'Living Room'),
    'Organization': allPosts.filter(post => post.category === 'Organization'),
    'Natural Materials': allPosts.filter(post => post.category === 'Materials' || post.category === 'Natural Materials'),
  };

  return (
    <main className={styles.homepage}>
      <Hero />
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          {loading ? (
            <p className={styles.loadingText}>
              Loading blog posts...
            </p>
          ) : error ? (
            <p className={styles.errorText}>
              Error loading posts: {error}
            </p>
          ) : allPosts.length === 0 ? (
            <p className={styles.emptyText}>
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <div className={styles.categorySections}>
              {Object.entries(categorizedPosts).map(([category, posts]) => (
                posts.length > 0 && (
                  <CategorySection 
                    key={category}
                    categoryName={category}
                    posts={posts}
                    maxPosts={4}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
