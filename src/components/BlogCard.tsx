'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogCard.module.css';
import LikeButton from './LikeButton';

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
          <div className={styles.imageOverlay} />
          {category && (
            <span className={styles.categoryTag}>{category}</span>
          )}
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.cardHeader}>
            <h3 className={styles.title}>{title}</h3>
            <LikeButton postSlug={slug} />
          </div>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.cardMeta}>
            <span className={styles.date}>{date}</span>
            {readTime && (
              <>
                <span className={styles.metaDot} />
                <span className={styles.readTime}>{readTime}</span>
              </>
            )}
          </div>
          <span className={styles.readMore}>
            Read Article <span className={styles.arrow}>&#8594;</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
