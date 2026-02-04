import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Us - The Minimalist Kraft & DO',
  description: 'Learn about our journey in minimalist home decor and our philosophy of intentional, beautiful living.',
}

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.aboutHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About TMKDO</h1>
          <p className={styles.heroSubtitle}>
            Curating Minimalist Beauty for Modern Living
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.paragraph}>
                The Minimalist Krafts & Decor Outlets began with a simple belief: 
                that less can indeed be more. In a world overwhelmed by excess, 
                we saw the need for a sanctuary of simplicity and intentional design.
              </p>
              <p className={styles.paragraph}>
                We curate home decor pieces and share insights that celebrate 
                natural materials, clean lines, and the timeless beauty of minimalism. 
                Each item we feature tells a story of craftsmanship, sustainability, 
                and purposeful living.
              </p>
              <p className={styles.paragraph}>
                Our mission is to help you create spaces that bring peace, clarity, 
                and joy—spaces that reflect who you are and how you want to live.
              </p>

              <AffiliateDisclosure variant="inline" />
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1000&fit=crop" 
                  alt="Minimalist interior"
                  className={styles.aboutImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.centerTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Simplicity</h3>
              <p className={styles.valueDescription}>
                We believe in the power of simplicity to create calm, 
                functional spaces that serve your life.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Sustainability</h3>
              <p className={styles.valueDescription}>
                We prioritize natural materials and eco-conscious choices 
                that respect our planet.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Timelessness</h3>
              <p className={styles.valueDescription}>
                We curate pieces that transcend trends, offering lasting 
                beauty and value.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Intentionality</h3>
              <p className={styles.valueDescription}>
                Every choice should be deliberate, meaningful, and aligned 
                with your values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Space?</h2>
          <p className={styles.ctaDescription}>
            Explore our blog for inspiration, tips, and curated recommendations 
            for creating your minimalist sanctuary.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/blog" className={styles.primaryCTA}>
              Explore Our Blog
            </Link>
            <Link href="/contact" className={styles.secondaryCTA}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
