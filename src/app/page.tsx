'use client';

import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';

const blogPosts = [
  {
    slug: 'minimalist-living-room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    date: 'January 15, 2026',
    title: '5 Essential Pieces for a Minimalist Living Room',
    excerpt: 'Creating a minimalist living room doesn\'t mean sacrificing comfort or style. Discover the five essential furniture and decor pieces that form the foundation of a perfectly balanced space.',
  },
  {
    slug: 'decluttering-guide',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop&q=80',
    date: 'January 10, 2026',
    title: 'The Art of Decluttering: A Room-by-Room Guide',
    excerpt: 'Transform your home into a peaceful sanctuary with our comprehensive decluttering guide. Learn practical strategies to tackle every room and maintain a clutter-free lifestyle.',
  },
  {
    slug: 'natural-materials',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    date: 'January 5, 2026',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    excerpt: 'Explore how natural materials bring warmth, texture, and authenticity to contemporary interiors. From reclaimed wood to handcrafted ceramics, discover the beauty of organic elements.',
  },
];

export default function Home() {
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
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
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
