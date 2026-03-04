'use client';

import { useState, useEffect } from 'react';
import styles from './SearchModal.module.css';
import type { BlogPost } from '@/types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPosts: BlogPost[];
}

export default function SearchModal({ isOpen, onClose, allPosts }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [trendingPostIds, setTrendingPostIds] = useState<string[]>([]);

  useEffect(() => {
    // Get trending posts from localStorage (most liked posts)
    const likedPostsStr = localStorage.getItem('likedPosts');
    const likedPosts = likedPostsStr ? JSON.parse(likedPostsStr) : [];
    
    // Sort posts by like count and get top 5
    const trendingIds = Object.entries(likedPosts)
      .sort(([, a]: any, [, b]: any) => (b.count || 0) - (a.count || 0))
      .slice(0, 5)
      .map(([slugId]) => slugId);
    
    setTrendingPostIds(trendingIds);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allPosts]);

  if (!isOpen) return null;

  const trendingPosts = allPosts.filter((post) => trendingPostIds.includes(post.slug));

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Search Posts</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        <div className={styles.searchBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search posts by title, topic, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className={styles.input}
          />
        </div>

        <div className={styles.content}>
          {searchQuery.trim() ? (
            <div className={styles.results}>
              {searchResults.length > 0 ? (
                <>
                  <h3 className={styles.resultsTitle}>
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </h3>
                  <ul className={styles.resultsList}>
                    {searchResults.map((post) => (
                      <li key={post.slug}>
                        <a href={`/blog/${post.slug}`} onClick={onClose}>
                          <div className={styles.resultImage}>
                            <img src={post.image} alt={post.title} />
                          </div>
                          <div className={styles.resultContent}>
                            <h4>{post.title}</h4>
                            <p className={styles.excerpt}>{post.excerpt.substring(0, 60)}...</p>
                            <span className={styles.category}>{post.category}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className={styles.noResults}>
                  <p>No posts found matching "{searchQuery}"</p>
                  <p className={styles.suggestion}>Try searching with different keywords</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.trending}>
              <h3 className={styles.trendingTitle}>🔥 Trending Now</h3>
              {trendingPosts.length > 0 ? (
                <ul className={styles.trendingList}>
                  {trendingPosts.map((post) => (
                    <li key={post.slug}>
                      <a href={`/blog/${post.slug}`} onClick={onClose}>
                        <div className={styles.trendingImage}>
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className={styles.trendingContent}>
                          <h4>{post.title}</h4>
                          <span className={styles.category}>{post.category}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.noTrending}>
                  <p>Start liking posts to see trending topics here!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
