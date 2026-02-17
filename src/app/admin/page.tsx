// Admin Dashboard Home Page
'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1>Welcome to TMKDO CMS</h1>
        <p className={styles.subtitle}>Manage your content with ease</p>

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
    </AdminLayout>
  );
}
