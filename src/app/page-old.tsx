'use client';

import Link from 'next/link';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';

const blogPosts = [
  {
    slug: 'minimalist-living-room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    date: 'January 15, 2026',
    title: '5 Essential Pieces for a Minimalist Living Room',
    excerpt: 'Creating a minimalist living room doesn\'t mean sacrificing comfort or style. Discover the five essential furniture and decor pieces that form the foundation of a perfectly balanced space.',
    category: 'Living Room',
  },
  {
    slug: 'corner-tv-stand',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80',
    date: 'January 16, 2026',
    title: 'Maximize Your Space: The Corner TV Stand Solution',
    excerpt: 'Discover how a corner TV stand can maximize your space while maintaining a clean, organized aesthetic.',
    category: 'Organization',
  },
  {
    slug: 'throw-blanket-styling',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop&q=80',
    date: 'January 17, 2026',
    title: 'The Art of Layering: Choosing the Perfect Throw Blanket',
    excerpt: 'Learn how to choose and style the perfect throw blanket to add comfort and visual depth to your living room.',
    category: 'Living Room',
  },
  {
    slug: 'pampas-grass-decor',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&h=600&fit=crop&q=80',
    date: 'January 18, 2026',
    title: 'Natural Elegance: Decorating with Pampas Grass',
    excerpt: 'Bring natural elegance into your home with pampas grass—a low-maintenance, sustainable way to add texture and beauty to any space.',
    category: 'Materials',
  },
  {
    slug: 'shagreen-desk-organizer',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&q=80',
    date: 'January 20, 2026',
    title: 'Elevate Your Desk with Shagreen: The Luxury Organizer Trend',
    excerpt: 'Discover how shagreen desk organizers bring luxury and sophistication to your workspace while maintaining minimalist principles.',
    category: 'Organization',
  },
  {
    slug: 'natural-materials',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    date: 'January 5, 2026',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    excerpt: 'Explore how natural materials bring warmth, texture, and authenticity to contemporary interiors. From reclaimed wood to handcrafted ceramics, discover the beauty of organic elements.',
    category: 'Materials',
  },
];

export default function HomePage() {
  // Get 6 most recent posts for featured section
  const featuredPosts = blogPosts.slice(0, 6);

  return (
    <main className={styles.homepage}>
      <Hero />
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Latest From Our Blog</h2>
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
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Join Our Community</h2>
          <p>Get weekly inspiration, design tips, and exclusive decor finds delivered straight to your inbox.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
          }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}
