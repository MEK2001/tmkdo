'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';

const blogPosts = [
  {
    slug: 'minimalist-living-room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    date: 'January 15, 2026',
    readTime: '8 min read',
    title: '5 Essential Pieces for a Minimalist Living Room',
    excerpt: 'Creating a minimalist living room doesn\'t mean sacrificing comfort or style. Discover the five essential furniture and decor pieces that form the foundation of a perfectly balanced space.',
    category: 'Living Room',
  },
  {
    slug: 'corner-tv-stand',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80',
    date: 'January 16, 2026',
    readTime: '6 min read',
    title: 'Maximize Your Space: The Corner TV Stand Solution',
    excerpt: 'Discover how a corner TV stand can maximize your space while maintaining a clean, organized aesthetic.',
    category: 'Organization',
  },
  {
    slug: 'throw-blanket-styling',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop&q=80',
    date: 'January 17, 2026',
    readTime: '5 min read',
    title: 'The Art of Layering: Choosing the Perfect Throw Blanket',
    excerpt: 'Learn how to choose and style the perfect throw blanket to add comfort and visual depth to your living room.',
    category: 'Living Room',
  },
  {
    slug: 'pampas-grass-decor',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&h=600&fit=crop&q=80',
    date: 'January 18, 2026',
    readTime: '7 min read',
    title: 'Natural Elegance: Decorating with Pampas Grass',
    excerpt: 'Bring natural elegance into your home with pampas grass—a low-maintenance, sustainable way to add texture and beauty to any space.',
    category: 'Materials',
  },
  {
    slug: 'shagreen-desk-organizer',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&q=80',
    date: 'January 20, 2026',
    readTime: '6 min read',
    title: 'Elevate Your Desk with Shagreen: The Luxury Organizer Trend',
    excerpt: 'Discover how shagreen desk organizers bring luxury and sophistication to your workspace while maintaining minimalist principles.',
    category: 'Organization',
  },
  {
    slug: 'natural-materials',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    date: 'January 5, 2026',
    readTime: '9 min read',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    excerpt: 'Explore how natural materials bring warmth, texture, and authenticity to contemporary interiors. From reclaimed wood to handcrafted ceramics, discover the beauty of organic elements.',
    category: 'Materials',
  },
];

function BlogContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by category
    if (category && category !== 'all') {
      posts = posts.filter(post => post.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const categoryMatch = post.category?.toLowerCase().includes(query);

        return titleMatch || excerptMatch || categoryMatch;
      });
    }

    return posts;
  }, [category, searchQuery]);

  return (
    <>
      {searchQuery && (
        <div className={styles.searchInfo}>
          <p>
            Found <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
            {category !== 'all' && ` in ${category}`}
          </p>
        </div>
      )}

      <div className={styles.blogGrid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))
        ) : (
          <div className={styles.noPosts}>
            <p>No posts found matching your search.</p>
            <p className={styles.noPostsHint}>
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function BlogPage() {
  return (
    <main className={styles.blogPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Our Blog</h1>
          <p className={styles.pageDescription}>
            Explore our latest articles on minimalist living, home decor, 
            and intentional design. Search or filter to find exactly what you need.
          </p>
        </header>

        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <BlogContent />
        </Suspense>
      </div>
    </main>
  );
}
