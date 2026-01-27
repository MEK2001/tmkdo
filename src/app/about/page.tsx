import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us - The Minimalist Kraft & DO',
  description: 'Learn about our journey in minimalist home decor and our philosophy of intentional, beautiful living.',
};

export default function AboutPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <h1>About Us</h1>
        <p>Crafting beautiful, intentional spaces that inspire calm and creativity in everyday living.</p>
      </section>

      <div className={styles.aboutContent}>
        <div className={styles.aboutSection}>
          <h2>Our Story</h2>
          <p>The Minimalist Kraft & DO was born from a simple belief: less is more. In a world filled with excess and constant consumption, we found ourselves yearning for something different—spaces that breathe, homes that tell stories, and objects that serve a purpose beyond mere decoration.</p>
          <p>What started as a personal journey to declutter and simplify our own living spaces has evolved into a platform where we share our passion for minimalist home decor, intentional design, and the art of curated living. We believe that every piece in your home should be chosen with care, loved deeply, and used purposefully.</p>
        </div>

        <div className={styles.highlightBox}>
          <h3>Our Philosophy</h3>
          <p>"True luxury is not about having everything—it's about having exactly what you need, beautifully crafted and thoughtfully placed. It's the freedom that comes from surrounding yourself only with things that add value to your life."</p>
        </div>

        <div className={styles.aboutSection}>
          <h2>What We Believe In</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌱</div>
              <h3>Sustainability</h3>
              <p>We champion natural materials, timeless designs, and quality over quantity to reduce environmental impact.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>✨</div>
              <h3>Intentionality</h3>
              <p>Every piece should serve a purpose and bring joy. We help you curate spaces that reflect your values.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🏡</div>
              <h3>Simplicity</h3>
              <p>Beauty lies in simplicity. Clean lines, neutral palettes, and functional design create peaceful environments.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Authenticity</h3>
              <p>We celebrate handcrafted items, local artisans, and pieces with soul over mass-produced alternatives.</p>
            </div>
          </div>
        </div>

        <div className={styles.aboutSection}>
          <h2>What We Do</h2>
          <p>Through our blog, we share practical guides, design inspiration, and honest product recommendations to help you create a home that's truly yours. From decluttering strategies to sourcing the perfect handmade ceramics, we cover every aspect of minimalist living.</p>
          <p>We're not about stark white rooms or uncomfortable furniture. Our approach to minimalism embraces warmth, texture, and personality. It's about creating spaces that feel inviting, lived-in, and uniquely beautiful.</p>
        </div>
      </div>

      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h3>50K+</h3>
            <p>Community Members</p>
          </div>
          <div className={styles.statItem}>
            <h3>200+</h3>
            <p>Design Guides</p>
          </div>
          <div className={styles.statItem}>
            <h3>1M+</h3>
            <p>Monthly Readers</p>
          </div>
          <div className={styles.statItem}>
            <h3>5 Years</h3>
            <p>Inspiring Minimalism</p>
          </div>
        </div>
      </section>
    </>
  );
}
