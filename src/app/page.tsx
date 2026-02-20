import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import NewsletterForm from '@/components/NewsletterForm';
import styles from './page.module.css';

export default async function HomePage() {
  // Fetch all posts from files
  const allPosts = await getAllPosts();
  
  // Get 6 most recent posts for featured section
  const featuredPosts = allPosts.slice(0, 6).map(post => ({
    slug: post.slug,
    image: post.image,
    date: new Date(post.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime || '5 min read',
  }));

  return (
    <main className={styles.homepage}>
      <Hero />
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Latest From Our Blog</h2>
          {allPosts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <>
              <div className={styles.featuredGrid}>
                {featuredPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
              <div className={styles.viewAllContainer}>
                <Link href="/blog" className={styles.viewAllButton}>
                  View All Posts →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Join Our Community</h2>
          <p>Get weekly inspiration, design tips, and exclusive decor finds delivered straight to your inbox.</p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
