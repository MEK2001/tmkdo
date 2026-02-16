import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RelatedPosts from '@/components/RelatedPosts';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { siteMetadata } from '@/lib/metadata';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import styles from './page.module.css';

// Static fallback posts for RelatedPosts (keeps current UX while CMS data powers content)
const staticRelatedPosts = [
  {
    slug: 'minimalist-living-room',
    title: '5 Essential Pieces for a Minimalist Living Room',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    excerpt:
      "Creating a minimalist living room doesn't mean sacrificing comfort or style. Discover the five essential furniture and decor pieces that form the foundation of a perfectly balanced space.",
  },
  {
    slug: 'decluttering-guide',
    title: 'The Art of Decluttering: A Room-by-Room Guide',
    image:
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop&q=80',
    excerpt:
      'Transform your home into a peaceful sanctuary with our comprehensive decluttering guide. Learn practical strategies to tackle every room and maintain a clutter-free lifestyle.',
  },
  {
    slug: 'natural-materials',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    excerpt:
      'Explore how natural materials bring warmth, texture, and authenticity to contemporary interiors. From reclaimed wood to handcrafted ceramics, discover the beauty of organic elements.',
  },
  {
    slug: 'shagreen-desk-organizer',
    title: 'Elevate Your Desk with Shagreen: The Luxury Organizer Trend',
    image:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&q=80',
    excerpt:
      'Discover how shagreen desk organizers bring luxury and sophistication to your workspace while maintaining minimalist principles.',
  },
  {
    slug: 'pampas-grass-decor',
    title: 'Natural Elegance: Decorating with Pampas Grass',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=600&fit=crop&q=80',
    excerpt:
      'Bring natural elegance into your home with pampas grass—a low-maintenance, sustainable way to add texture and beauty to any space.',
  },
  {
    slug: 'throw-blanket-styling',
    title: 'The Art of Layering: Choosing the Perfect Throw Blanket',
    image:
      'https://images.unsplash.com/photo-1595521624873-40eb57769f00?w=800&h=600&fit=crop&q=80',
    excerpt:
      'Learn how to choose and style the perfect throw blanket to add comfort and visual depth to your living room.',
  },
  {
    slug: 'corner-tv-stand',
    title: 'Maximize Your Space: The Corner TV Stand Solution',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80',
    excerpt:
      'Discover how a corner TV stand can maximize your space while maintaining a clean, organized aesthetic.',
  },
];

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    return {
      title: 'Post Not Found',
    };
  }

  const publishedDate = new Date(post.date).toISOString();
  const modifiedDate = publishedDate;
  const postUrl = `${siteMetadata.url}/blog/${post.slug}`;
  const excerpt =
    post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');

  return {
    title: post.title,
    description: excerpt,
    keywords: [...siteMetadata.keywords],
    authors: [
      {
        name: 'TMKDO Team',
      },
    ],
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ['TMKDO Team'],
      section: 'Lifestyle',
      tags: ['minimalist', 'home decor', post.category.toLowerCase()],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: [post.image],
      creator: siteMetadata.twitterHandle,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const postUrl = `${siteMetadata.url}/blog/${post.slug}`;
  const excerpt =
    post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: [post.image],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'TMKDO',
      url: siteMetadata.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.url}${siteMetadata.logo}`,
      },
    },
    description: excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.blogPostContainer}>
        <article className={styles.article}>
          <header className={styles.postHeader}>
            <h1 className={styles.postTitle}>{post.title}</h1>

            <div className={styles.postMeta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.date}>
                <svg
                  className={styles.dateIcon}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.readTime}>
                <svg
                  className={styles.timeIcon}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.readTime}
              </span>
            </div>
          </header>

          <div className={styles.featuredImage}>
            <img src={post.image} alt={post.imageAlt || post.title} />
          </div>

          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <AffiliateDisclosure />
        </article>

        <aside className={styles.sidebarWrapper}>
          <RelatedPosts currentSlug={post.slug} posts={staticRelatedPosts} />
        </aside>
      </div>
    </>
  );
}


