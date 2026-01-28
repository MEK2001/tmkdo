'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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

const categories = ['All', 'Living Room', 'Organization', 'Materials'];

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Set category from URL on mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
      // Scroll to blog section
      setTimeout(() => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Minimalist Home Decor & Curated Living</h1>
          <p>Discover the art of simple, intentional living through thoughtful design and timeless home decor pieces.</p>
          <a href="#blog" className={styles.ctaButton}>Explore Our Blog</a>
        </div>
      </section>

      <section id="blog" className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Latest From Our Blog</h2>
        
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.blogGrid}>
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
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
    </>
  );
}
