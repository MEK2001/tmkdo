'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './CategoryFilter.module.css';

const categories = [
  { name: 'All Posts', slug: 'all' },
  { name: 'Living Room', slug: 'Living Room' },
  { name: 'Organization', slug: 'Organization' },
  { name: 'Materials', slug: 'Materials' },
];

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category') || 'all';

  const handleCategoryClick = (slug: string) => {
    if (slug === 'all') {
      router.push('/blog');
    } else {
      router.push(`/blog?category=${slug}`);
    }
  };

  return (
    <div className={styles.categoryFilter}>
      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className={`${styles.categoryButton} ${
              activeCategory === category.slug || (category.slug === 'all' && activeCategory === '') ? styles.active : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
