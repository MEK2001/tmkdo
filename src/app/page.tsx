'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Newsletter from '@/components/Newsletter';
import styles from './page.module.css';

interface BlogPost {
  slug: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        console.log('[Homepage] Loading posts from API...');
        
        const response = await fetch('/api/blog/posts', {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`);
        }

        const data = await response.json();
        console.log(`[Homepage] Loaded ${data.posts.length} posts from API`);
        
        // Format dates and get 6 most recent posts
        const formatted = data.posts
          .slice(0, 6)
          .map((post: any) => ({
            ...post,
            date: new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }));
        
        setFeaturedPosts(formatted);
      } catch (err: any) {
        console.error('[Homepage] Error loading posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  useEffect(() => {
    const quotes = [
      '“Sanctuaries of Timeless Kraft.”',
      '“Where Texture Meets Intent.”',
      '“Quiet Luxury, Daily.”',
    ];

    const active = quotes[typingIndex % quotes.length];
    const speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      setTypingText((current) => {
        if (!isDeleting) {
          const next = active.slice(0, current.length + 1);
          if (next === active) {
            setTimeout(() => setIsDeleting(true), 1200);
          }
          return next;
        }

        const next = active.slice(0, current.length - 1);
        if (next.length === 0) {
          setIsDeleting(false);
          setTypingIndex((value) => value + 1);
        }
        return next;
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [typingIndex, isDeleting]);

  const heroPost = featuredPosts[0];
  const featuredPost = featuredPosts[1] || featuredPosts[0];
  const secondaryPost = featuredPosts[2] || featuredPosts[1] || featuredPosts[0];
  const tertiaryPost = featuredPosts[3] || featuredPosts[2] || featuredPosts[1] || featuredPosts[0];
  const heroImage = 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1800&h=1200&fit=crop&q=85';
  const teaserImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&h=900&fit=crop&q=85';

  return (
    <main className={styles.homepage}>
      <section className={styles.editorialBoard}>
        <div className={styles.leftColumn}>
          <div className={styles.heroPanel}>
            <Image
              src={heroImage}
              alt="Royal room setting"
              fill
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroOverlay}>
              <p className={styles.heroMeta}>EST. 2026 | London & Berlin</p>
              <h1 className={styles.heroTitle}>{typingText}<span className={styles.cursor}>|</span></h1>
            </div>
          </div>

          <article className={styles.lowerFeatureBlock}>
            <div className={styles.paperLayer} />
            <div className={styles.paperLayerAlt} />
            <div className={styles.scrapbookCard}>
              {tertiaryPost?.image ? (
                <Image
                  src={tertiaryPost.image}
                  alt={tertiaryPost.title}
                  width={230}
                  height={155}
                  className={styles.scrapbookImage}
                />
              ) : (
                <div className={styles.scrapbookImageFallback} />
              )}
              <div className={styles.scrapbookContent}>
                <h2>{tertiaryPost?.title || 'The Art of Dark Wood Revival'}</h2>
                <p>{tertiaryPost?.excerpt || 'Layered textures and warm compositions inspired by modern royal minimalism.'}</p>
                <Link href={tertiaryPost ? `/blog/${tertiaryPost.slug}` : '/blog'} className={styles.readArticle}>
                  Read Article
                </Link>
              </div>
            </div>
          </article>
        </div>

        <aside className={styles.sideColumn}>
          <article className={styles.scrapbookBlock}>
            <div className={styles.paperLayer} />
            <div className={styles.paperLayerAlt} />
            <div className={styles.scrapbookCardWrap}>
              <div className={styles.scrapbookCard}>
                {featuredPost?.image ? (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={230}
                    height={170}
                    className={styles.scrapbookImage}
                  />
                ) : (
                  <div className={styles.scrapbookImageFallback} />
                )}
                <div className={styles.scrapbookContent}>
                  <h2>{featuredPost?.title || 'The Art of Dark Wood Revival'}</h2>
                  <p>{featuredPost?.excerpt || 'High-end photo detail at scale with tactile storytelling and layered editorial composition.'}</p>
                  <Link href={featuredPost ? `/blog/${featuredPost.slug}` : '/blog'} className={styles.readArticle}>
                    Read Article
                  </Link>
                </div>
              </div>
              <article className={styles.scrapbookTeaser}>
                <Image
                  src={teaserImage}
                  alt="Floating shelf decor"
                  width={210}
                  height={210}
                  className={styles.scrapbookTeaserImage}
                />
                <div className={styles.scrapbookTeaserCaption}>
                  5 Floating Shelves for a Modern Palace
                </div>
              </article>
            </div>
          </article>

          <section className={styles.dailyDoseBlock}>
            <p className={styles.dailyDoseTitle}>TD | The Daily Dose of Royal Kraft</p>
            <div className={styles.dailyDoseContent}>
              <div className={styles.monogramFrame}>
                <Image
                  src="/logo.svg"
                  alt="TMKDO Monogram"
                  width={170}
                  height={170}
                  className={styles.monogram}
                />
              </div>
              <div className={styles.dailyList}>
                <p>{secondaryPost?.title || 'Layering Textures: Rough Wood & Polished Brass'}</p>
                <p>{heroPost?.title || 'Sanctuaries of Timeless Kraft'}</p>
                <Link href="/blog" className={styles.dailyLink}>View all stories</Link>
              </div>
            </div>
          </section>

          <Newsletter />

          {loading && <p className={styles.statusText}>Loading editorial posts...</p>}
          {!loading && error && <p className={styles.errorText}>Error loading posts: {error}</p>}
        </aside>
      </section>
    </main>
  );
}
