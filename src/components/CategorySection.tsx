'use client';

import Link from 'next/link';
import BlogCard from './BlogCard';
import styles from './CategorySection.module.css';

interface BlogPost {
  slug: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

interface CategorySectionProps {
  categoryName: string;
  posts: BlogPost[];
  maxPosts?: number;
}

export default function CategorySection({ categoryName, posts, maxPosts = 4 }: CategorySectionProps) {
  const displayPosts = posts.slice(0, maxPosts);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>{categoryName}</h2>
        <div className={styles.divider}></div>
      </div>
      
      <div className={styles.postsGrid}>
        {displayPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
      
      <div className={styles.viewAllContainer}>
        <Link 
          href={`/blog?category=${encodeURIComponent(categoryName)}`} 
          className={styles.viewAllLink}
        >
          View All {categoryName} →
        </Link>
      </div>
    </section>
  );
}
