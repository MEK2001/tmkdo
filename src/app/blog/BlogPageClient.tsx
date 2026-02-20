'use client';

import { Suspense, useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  category: string;
}

export default function BlogPageClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        console.log('[Blog Page] Loading posts...');
        
        const response = await fetch('/api/blog/posts');
        if (!response.ok) {
          throw new Error('Failed to load posts');
        }

        const data = await response.json();
        console.log(`[Blog Page] Loaded ${data.posts.length} posts`);
        
        // Format dates for display
        const formatted = data.posts.map((post: any) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        
        setBlogPosts(formatted);
      } catch (err: any) {
        console.error('[Blog Page] Error loading posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Get unique categories
  const uniqueCategories = useMemo(() => {
    const categories = new Set(blogPosts.map(post => post.category));
    return Array.from(categories).sort();
  }, [blogPosts]);

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  return (
    <main className={styles.blogContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Our Blog</h1>
        <p className={styles.pageDescription}>
          Explore our collection of articles on minimalist living, home decor, and sustainable designs.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <SearchAndFilter />

        {loading ? (
          <div className={styles.loadingState}>
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>⚠️ {error}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No posts found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {filteredPosts.map(post => (
              <Suspense key={post.slug} fallback={<div>Loading...</div>}>
                <BlogCard
                  slug={post.slug}
                  image={post.image}
                  date={post.date}
                  readTime={post.readTime}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
