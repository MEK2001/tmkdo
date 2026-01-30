import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.brandName}>TMKDO</span>
        </h1>
        <p className={styles.heroSubtitle}>
          The Minimalist Krafts & Decor Outlets
        </p>
        <p className={styles.heroDescription}>
          Discover the art of minimalist living through curated home decor, 
          natural materials, and timeless design inspiration. Transform your 
          space into a sanctuary of calm and intentional beauty.
        </p>
        <div className={styles.heroCTA}>
          <Link href="/blog" className={styles.primaryButton}>
            Explore Our Blog
          </Link>
          <Link href="/about" className={styles.secondaryButton}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
