import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import Image from 'next/image';
import RelatedPosts from '@/components/RelatedPosts';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import {siteMetadata} from '@/lib/metadata';
import {client} from '@/lib/sanity.client';
import {POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY, POSTS_QUERY} from '@/lib/sanity.queries';
import {transformSanityPost} from '@/lib/sanity.utils';
import {urlFor} from '@/lib/sanity.image';
import {SanityPost} from '@/types/blog';
import styles from './page.module.css';

export const runtime = 'nodejs';
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await client.fetch(POSTS_QUERY);
  return posts.map((post: SanityPost) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const post: SanityPost | null = await client.fetch(POST_BY_SLUG_QUERY, {slug});

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const postUrl = `${siteMetadata.url}/blog/${slug}`;
  const publishedDate = new Date(post.publishedAt).toISOString();
  const imageUrl = urlFor(post.coverImage).width(1200).height(630).url();

  return {
    title: post.title,
    description: post.excerpt,
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
      description: post.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: publishedDate,
      modifiedTime: publishedDate,
      authors: ['TMKDO Team'],
      section: 'Lifestyle',
      tags: ['minimalist', 'home decor', post.category.toLowerCase()],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: siteMetadata.twitterHandle,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPost({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const post: SanityPost | null = await client.fetch(POST_BY_SLUG_QUERY, {slug});

  if (!post) {
    notFound();
  }

  const relatedPosts = await client.fetch(RELATED_POSTS_QUERY, {
    category: post.category,
    slug: post.slug,
  });
  const transformedRelated = relatedPosts.map(transformSanityPost);

  const postUrl = `${siteMetadata.url}/blog/${slug}`;
  const imageUrl = urlFor(post.coverImage).width(1200).height(800).url();
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readTime = post.readingTime ? `${post.readingTime} min read` : '5 min read';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: [imageUrl],
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'TMKDO',
      url: siteMetadata.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TMKDO',
      url: siteMetadata.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.url}/logo.png`,
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
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
                {formattedDate}
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
                {readTime}
              </span>
            </div>
          </header>

          <div className={styles.featuredImage}>
            <Image
              src={imageUrl}
              alt={post.coverImage.alt || post.title}
              width={1200}
              height={800}
              priority
              style={{width: '100%', height: 'auto'}}
            />
          </div>

          <div className={styles.articleContent}>
            <PortableTextRenderer value={post.body || []} />
          </div>
        </article>

        <aside className={styles.sidebarWrapper}>
          <RelatedPosts currentSlug={slug} posts={transformedRelated} />
        </aside>
      </div>
    </>
  );
}
