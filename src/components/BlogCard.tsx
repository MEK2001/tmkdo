'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  slug: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  category?: string;
  readTime?: string;
}

export default function BlogCard({ slug, image, date, title, excerpt, category, readTime }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    // Ensure card is visible first
    if (card) {
      card.style.opacity = '1';
    }

    // GSAP animation on scroll (if GSAP is available)
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const ctx = window.gsap.context(() => {
        window.gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
            onLeave: () => {
              // Ensure card stays visible after animation
              if (card) {
                card.style.opacity = '1';
              }
            },
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            // Ensure card stays visible after animation completes
            if (card) {
              card.style.opacity = '1';
            }
          },
        });
      }, cardRef);

      return () => {
        ctx.revert();
        // Ensure card stays visible after cleanup
        if (card) {
          card.style.opacity = '1';
        }
      };
    }
  }, []);

  // Fallback image if none provided
  const imageUrl = image || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop';

  return (
    <article ref={cardRef} className={styles.blogCard}>
      <Link href={`/blog/${slug}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={false}
          />
          {category && (
            <span className={styles.categoryBadge}>{category}</span>
          )}
        </div>
        <div className={styles.contentContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.cardMeta}>
            <span className={styles.date}>{date}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.readTime}>{readTime}</span>
          </div>
          <span 
            className={styles.readMoreButton}
            aria-label={`Read full article about ${title}`}
          >
            Read More <span className={styles.arrow}>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
