'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  // Fallback image if none provided
  const imageUrl = image || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop';

  return (
    <article className={styles.blogCard}>
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
        </div>
        <div className={styles.contentContainer}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
    </article>
  );
}