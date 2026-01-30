'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SearchAndFilter.module.css';

const categories = [
  { name: 'All Categories', slug: 'all' },
  { name: 'Living Room', slug: 'Living Room' },
  { name: 'Organization', slug: 'Organization' },
  { name: 'Materials', slug: 'Materials' },
];

export default function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    updateURL(query, selectedCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateURL(searchQuery, category);
  };

  const updateURL = (search: string, category: string) => {
    const params = new URLSearchParams();
    
    if (search) params.set('search', search);
    if (category && category !== 'all') params.set('category', category);
    
    const queryString = params.toString();
    router.push(queryString ? `/blog?${queryString}` : '/blog');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL('', selectedCategory);
  };

  return (
    <div className={styles.searchAndFilter}>
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchInputContainer}>
            <svg 
              className={styles.searchIcon} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              className={styles.searchInput}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button 
                onClick={handleClearSearch}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className={styles.filterWrapper}>
          <label htmlFor="category-filter" className={styles.filterLabel}>
            <svg 
              className={styles.filterIcon} 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={styles.filterSelect}
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
