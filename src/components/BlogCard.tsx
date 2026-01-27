'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  slug: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
}

export default function BlogCard({ slug, image, date, title, excerpt }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation on scroll (if GSAP is available)
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <article ref={cardRef} className={styles.blogCard}>
      <Link href={`/blog/${slug}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} loading="lazy" />
        </div>
        <div className={styles.content}>
          <div className={styles.date}>{date}</div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
          <span className={styles.readMore}>
            Read More <span className={styles.arrow}>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
