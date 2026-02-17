// Admin Dashboard Home Page
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  published: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/admin/posts');
        if (res.ok) {
          const data = await res.json();
          // Get the 5 most recent posts
          setPosts(data.posts.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const publishedCount = posts.filter(p => p.published).length;
  const draftCount = posts.filter(p => !p.published).length;

  return (
    <div className={styles.container}>
      <h1>Welcome to TMKDO CMS</h1>
      <p className={styles.subtitle}>Manage your content with ease</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📝</span>
          <div>
            <p className={styles.statValue}>{posts.length}</p>
            <p className={styles.statLabel}>Total Posts</p>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>✅</span>
          <div>
            <p className={styles.statValue}>{publishedCount}</p>
            <p className={styles.statLabel}>Published</p>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📋</span>
          <div>
            <p className={styles.statValue}>{draftCount}</p>
            <p className={styles.statLabel}>Drafts</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent Posts</h2>
          <Link href="/admin/posts" className={styles.viewAll}>
            View All →
          </Link>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className={styles.postsList}>
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/admin/posts/${post.slug}`}
                className={styles.postItem}
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className={styles.postImage}
                  />
                )}
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={styles.postCategory}>{post.category}</span>
                    <span className={styles.postStatus}>
                      {post.published ? '✓ Published' : '⏳ Draft'}
                    </span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <p className={styles.postDate}>{new Date(post.date).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No posts yet. Create your first post to get started!</p>
            <Link href="/admin/posts/new" className={styles.createBtn}>
              Create Post
            </Link>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        <Link href="/admin/posts" className={styles.card}>
          <span className={styles.cardIcon}>📝</span>
          <h2>Blog Posts</h2>
          <p>Create, edit, and manage your blog posts</p>
        </Link>

        <Link href="/admin/settings" className={styles.card}>
          <span className={styles.cardIcon}>⚙️</span>
          <h2>Site Settings</h2>
          <p>Configure your website settings and preferences</p>
        </Link>

        <a href="https://github.com/MEK2001/tmkdo" target="_blank" rel="noopener noreferrer" className={styles.card}>
          <span className={styles.cardIcon}>📦</span>
          <h2>View Repository</h2>
          <p>Access your GitHub repository</p>
        </a>

        <a href="/" target="_blank" rel="noopener noreferrer" className={styles.card}>
          <span className={styles.cardIcon}>🌐</span>
          <h2>View Website</h2>
          <p>Preview your live website</p>
        </a>
      </div>

      <div className={styles.info}>
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>All changes are automatically committed to your GitHub repository</li>
          <li>Images are stored in the <code>/public/images/blog</code> directory</li>
          <li>Posts support Markdown formatting for rich content</li>
          <li>Changes may take a few minutes to appear on your live site</li>
        </ul>
      </div>
    </div>
  );
}
