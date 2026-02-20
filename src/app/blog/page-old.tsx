import { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts';
import BlogContentClient from './BlogContentClient';
import styles from './page.module.css';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.blogPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Our Blog</h1>
          <p className={styles.pageDescription}>
            Explore our latest articles on minimalist living, home decor,
            and intentional design. Search or filter to find exactly what you need.
          </p>
        </header>

        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <BlogContentClient posts={posts} />
        </Suspense>
      </div>
    </main>
  );
}
