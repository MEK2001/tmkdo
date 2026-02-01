'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'minimalist-living-room',
    title: '5 Essential Pieces for a Minimalist Living Room',
    date: 'January 15, 2026',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    category: 'Living Room',
    excerpt: 'Learn the five furniture pieces that form the foundation of a minimalist living room.'
  },
  {
    slug: 'corner-tv-stand',
    title: 'Maximize Your Space: The Corner TV Stand Solution',
    date: 'January 16, 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
    category: 'Organization',
    excerpt: 'Explore how a well-designed corner TV stand can transform your living room layout.'
  },
  {
    slug: 'throw-blanket-styling',
    title: 'The Art of Layering: Choosing the Perfect Throw Blanket',
    date: 'January 17, 2026',
    image: 'https://images.unsplash.com/photo-1564603808762-b7a5ccd51b77?w=800&h=600&fit=crop&q=80',
    category: 'Living Room',
    excerpt: 'Master the art of textile layering with our guide to selecting throw blankets.'
  },
  {
    slug: 'pampas-grass-decor',
    title: 'Natural Elegance: Decorating with Pampas Grass',
    date: 'January 18, 2026',
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=800&h=600&fit=crop&q=80',
    category: 'Materials',
    excerpt: 'Bring natural elegance into your home with pampas grass styling tips.'
  },
  {
    slug: 'shagreen-desk-organizer',
    title: 'Elevate Your Desk with Shagreen: The Luxury Organizer Trend',
    date: 'January 20, 2026',
    image: 'https://images.unsplash.com/photo-1586578042364-decf17b99017?w=800&h=600&fit=crop&q=80',
    category: 'Organization',
    excerpt: 'Discover how shagreen desk organizers combine functionality with luxury aesthetics.'
  },
  {
    slug: 'natural-materials',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    date: 'January 5, 2026',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop&q=80',
    category: 'Materials',
    excerpt: 'Discover how to incorporate natural materials into your modern home design.'
  },
];

function BlogContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

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
      <SearchAndFilter />

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
