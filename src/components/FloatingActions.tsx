'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FloatingActions.module.css';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

export default function FloatingActions() {
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch all posts
    fetch('/api/posts.json')
      .then(res => res.json())
      .then(data => setAllPosts(data.posts || []))
      .catch(err => console.error('Failed to load posts:', err));
  }, []);

  useEffect(() => {
    // Prevent body scroll when search modal is open
    if (showSearch) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [showSearch]);

  useEffect(() => {
    // Check if current page is saved and get like count
    if (typeof window !== 'undefined') {
      const savedPages = JSON.parse(localStorage.getItem('savedPages') || '[]');
      const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');
      const currentPath = window.location.pathname;
      
      setSaved(savedPages.includes(currentPath));
      setLikeCount(likeCounts[currentPath] || 0);

      // Load saved posts
      updateSavedPosts(savedPages);
    }
  }, [allPosts]);

  const updateSavedPosts = (savedPages: string[]) => {
    const saved = allPosts.filter(post => 
      savedPages.includes(`/blog/${post.slug}`)
    );
    setSavedPosts(saved);
  };

  // Group posts by category and get the most recent post from each
  // In the future, this will be replaced with actual traffic/read data
  const getTrendingPostsByCategory = () => {
    const categoryMap = new Map<string, Post>();
    
    allPosts.forEach(post => {
      if (!categoryMap.has(post.category)) {
        categoryMap.set(post.category, post);
      }
    });
    
    return Array.from(categoryMap.values()).slice(0, 6);
  };

  // Get search suggestions based on query
  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    ).slice(0, 8);
  };

  const searchSuggestions = getSearchSuggestions();

  const handleSave = () => {
    if (typeof window === 'undefined') return;

    const savedPages = JSON.parse(localStorage.getItem('savedPages') || '[]');
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');
    const currentPath = window.location.pathname;

    if (saved) {
      // Remove from saved and decrement like count
      const filtered = savedPages.filter((path: string) => path !== currentPath);
      localStorage.setItem('savedPages', JSON.stringify(filtered));
      
      const newCount = Math.max(0, (likeCounts[currentPath] || 0) - 1);
      likeCounts[currentPath] = newCount;
      localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
      
      setSaved(false);
      setLikeCount(newCount);
      updateSavedPosts(filtered);
    } else {
      // Add to saved and increment like count
      savedPages.push(currentPath);
      localStorage.setItem('savedPages', JSON.stringify(savedPages));
      
      const newCount = (likeCounts[currentPath] || 0) + 1;
      likeCounts[currentPath] = newCount;
      localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
      
      setSaved(true);
      setLikeCount(newCount);
      updateSavedPosts(savedPages);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery.trim())}`;
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Get trending posts - grouped by category (most recent post from each category)
  // TODO: In the future, replace with actual traffic and read analytics
  const trendingPosts = getTrendingPostsByCategory();

  // Get hot topics (unique categories) - in future will be sorted by traffic/engagement
  const hotTopics = Array.from(new Set(allPosts.map(post => post.category))).slice(0, 6);

  return (
    <>
      <div className={`${styles.floatingActions} ${showSearch ? styles.hidden : ''}`}>
        <div className={styles.likeWrapper}>
          {likeCount > 0 && (
            <span className={styles.likeCount}>{likeCount}</span>
          )}
          <button
            className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
            onClick={handleSave}
            aria-label={saved ? 'Unsave page' : 'Save page'}
            title={saved ? 'Unsave page' : 'Save page'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill={saved ? 'currentColor' : 'none'}/>
            </svg>
          </button>
        </div>
        <button
          className={styles.actionBtn}
          onClick={() => setShowSearch(!showSearch)}
          aria-label="Search"
          title="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {showSearch && (
        <div className={styles.searchModal} onClick={() => setShowSearch(false)}>
          <div className={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
            >
              ✕
            </button>
            
            <div className={styles.searchInputSection}>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {searchQuery.trim() && searchSuggestions.length > 0 && (
                <div className={styles.suggestionsDropdown}>
                  <h4 className={styles.suggestionsTitle}>Suggestions</h4>
                  <ul className={styles.suggestionsList}>
                    {searchSuggestions.map(post => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className={styles.suggestionItem}
                          onClick={() => setShowSearch(false)}
                        >
                          <div className={styles.suggestionContent}>
                            <h5 className={styles.suggestionTitle}>{post.title}</h5>
                            <p className={styles.suggestionCategory}>{post.category}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Search Content - Only show when no suggestions or empty query */}
            {!searchQuery.trim() && (
            <div className={styles.searchContent}>
              {/* My Favorites Section */}
              {savedPosts.length > 0 && (
                <section className={styles.section}>
                  <h3 className={styles.sectionTitle}>MY FAVORITES</h3>
                  <div className={styles.favoritesGrid}>
                    {savedPosts.slice(0, 4).map(post => (
                      <Link 
                        key={post.slug} 
                        href={`/blog/${post.slug}`}
                        className={styles.favoriteItem}
                        onClick={() => setShowSearch(false)}
                      >
                        <div className={styles.favoriteImage}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="120px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <span className={styles.favoriteTitle}>{post.title}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Trending Posts Section */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>TRENDING</h3>
                <div className={styles.trendingGrid}>
                  {trendingPosts.map(post => (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.slug}`}
                      className={styles.trendingItem}
                      onClick={() => setShowSearch(false)}
                    >
                      <div className={styles.trendingImage}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 200px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <h4 className={styles.trendingTitle}>{post.title}</h4>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Hot Topics Section */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>HOT TOPICS</h3>
                <div className={styles.topicsGrid}>
                  {hotTopics.map(topic => (
                    <Link
                      key={topic}
                      href={`/blog?category=${encodeURIComponent(topic)}`}
                      className={styles.topicTag}
                      onClick={() => setShowSearch(false)}
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
