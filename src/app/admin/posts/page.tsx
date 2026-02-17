// Blog Posts List Page
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/components/admin/AdminContext';
import { BlogPost } from '@/lib/admin/content';
import styles from './page.module.css';

export default function PostsPage() {
  const { githubToken } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (githubToken) {
      loadPosts();
    }
  }, [githubToken]);

  async function loadPosts() {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/posts', {
        headers: {
          'x-github-token': githubToken!
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
        headers: {
          'x-github-token': githubToken!
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      loadPosts();
    } catch (err: any) {
      alert(err.message);
    }
  }

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Blog Posts</h1>
            <p className={styles.subtitle}>
              {posts.length} total posts
            </p>
          </div>
          <Link href="/admin/posts/new" className={styles.createBtn}>
            ➕ New Post
          </Link>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({posts.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'published' ? styles.active : ''}`}
            onClick={() => setFilter('published')}
          >
            Published ({posts.filter(p => p.published).length})
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'draft' ? styles.active : ''}`}
            onClick={() => setFilter('draft')}
          >
            Draft ({posts.filter(p => !p.published).length})
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>❌ {error}</p>
            <button onClick={loadPosts} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📝</span>
            <h3>No posts found</h3>
            <p>Create your first blog post to get started</p>
            <Link href="/admin/posts/new" className={styles.createBtn}>
              ➕ Create Post
            </Link>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <div key={post.slug} className={styles.postCard}>
                {post.image && (
                  <div className={styles.postImage}>
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={`${styles.badge} ${post.published ? styles.published : styles.draft}`}>
                      {post.published ? '✅ Published' : '✏️ Draft'}
                    </span>
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.postFooter}>
                    <div className={styles.tags}>
                      <span className={styles.category}>{post.category}</span>
                    </div>
                    <div className={styles.actions}>
                      <Link href={`/admin/posts/${post.slug}`} className={styles.editBtn}>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
