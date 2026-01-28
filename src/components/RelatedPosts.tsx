'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './RelatedPosts.module.css';

interface Post {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
}

interface RelatedPostsProps {
  currentSlug: string;
  posts: Post[];
}

export default function RelatedPosts({ currentSlug, posts }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.heading}>Related Articles</h3>
      <div className={styles.postsContainer}>
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={styles.relatedCard}
          >
            <div className={styles.thumbnailContainer}>
              <Image 
                src={post.image} 
                alt={post.title} 
                fill
                sizes="80px"
                className={styles.thumbnail}
              />
            </div>
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>{post.title}</h4>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
