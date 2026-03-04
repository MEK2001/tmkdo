'use client';

import { useEffect, useState } from 'react';
import styles from './LikeButton.module.css';

interface LikeButtonProps {
  postSlug: string;
  showText?: boolean;
}

export default function LikeButton({ postSlug, showText = false }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load likes from localStorage
    const likedPostsStr = localStorage.getItem('likedPosts');
    const likedPosts = likedPostsStr ? JSON.parse(likedPostsStr) : {};
    
    if (likedPosts[postSlug]) {
      setIsLiked(true);
      setLikeCount(likedPosts[postSlug].count || 1);
    }
  }, [postSlug]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Get current likes from localStorage
    const likedPostsStr = localStorage.getItem('likedPosts');
    const likedPosts = likedPostsStr ? JSON.parse(likedPostsStr) : {};

    if (isLiked) {
      // Unlike
      delete likedPosts[postSlug];
      setIsLiked(false);
      setLikeCount(0);
    } else {
      // Like
      likedPosts[postSlug] = {
        liked: true,
        count: (likedPosts[postSlug]?.count || 0) + 1,
        timestamp: new Date().toISOString(),
      };
      setIsLiked(true);
      setLikeCount(likedPosts[postSlug].count);
    }

    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };

  if (!mounted) {
    return (
      <button className={styles.likeBtn} disabled>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        {showText && <span>0</span>}
      </button>
    );
  }

  return (
    <button
      className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
      onClick={handleLike}
      aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
      title={isLiked ? 'Unlike this post' : 'Like this post'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {showText && <span>{likeCount}</span>}
    </button>
  );
}
