'use client';

import { Suspense, useMemo, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  category: string;
}

export default function BlogPageClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/blog/posts');
        if (!response.ok) throw new Error('Failed to load posts');
        const data = await response.json();
        const formatted = data.posts.map((post: BlogPost) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          }),
        }));
        setBlogPosts(formatted);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(blogPosts.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(cats).sort()];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat = selectedCategory === 'all' || post.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    router.push(`?${params.toString()}`);
  };

  return (
    <main className={styles.blogPage}>
      {/*  Page banner  */}
      <div className={styles.pageBanner}>
        <p className={styles.bannerEyebrow}>The Journal</p>
        <h1 className={styles.bannerTitle}>Stories &amp; Spaces</h1>
        <p className={styles.bannerSubtitle}>
          Essays on intentional living, natural materials, and the beauty of less.
        </p>
        <div className={styles.bannerRule} />
      </div>

      <div className={styles.wrapper}>
        {/*  Sidebar  */}
        <aside className={styles.sidebar}>
          <div className={styles.sideWidget}>
            <h3 className={styles.widgetHeading}>Browse by Topic</h3>
            <ul className={styles.categoryList}>
              {uniqueCategories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat === 'all' ? 'All Articles' : cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sideWidget}>
            <h3 className={styles.widgetHeading}>Search</h3>
            <form
              className={styles.searchForm}
              onSubmit={(e) => {
                e.preventDefault();
                const val = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                const params = new URLSearchParams(searchParams.toString());
                if (val) params.set('search', val);
                else params.delete('search');
                router.push(`?${params.toString()}`);
              }}
            >
              <input
                name="q"
                defaultValue={searchQuery}
                placeholder="Type to search"
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>Go</button>
            </form>
          </div>
        </aside>

        {/*  Main grid  */}
        <section className={styles.main}>
          {searchQuery && (
            <p className={styles.searchInfo}>
              {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
          {loading ? (
            <div className={styles.statusBox}>Loading articles</div>
          ) : error ? (
            <div className={styles.statusBox}> {error}</div>
          ) : filteredPosts.length === 0 ? (
            <div className={styles.statusBox}>No articles found. Try a different search.</div>
          ) : (
            <div className={styles.grid}>
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
