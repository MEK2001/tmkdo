'use client';

import {useMemo} from 'react';
import {useSearchParams} from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import {BlogPost} from '@/types/blog';
import styles from './page.module.css';

interface BlogContentProps {
  posts: BlogPost[];
}

export default function BlogContentClient({posts}: BlogContentProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (category && category !== 'all') {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const categoryMatch = post.category?.toLowerCase().includes(query);

        return titleMatch || excerptMatch || categoryMatch;
      });
    }

    return filtered;
  }, [posts, category, searchQuery]);

  return (
    <>
      <SearchAndFilter />

      {searchQuery && (
        <div className={styles.searchInfo}>
          <p>
            Found <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
            {category !== 'all' && ` in ${category}`}
          </p>
        </div>
      )}

      <div className={styles.blogGrid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))
        ) : (
          <div className={styles.noPosts}>
            <p>No posts found matching your search.</p>
            <p className={styles.noPostsHint}>
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
