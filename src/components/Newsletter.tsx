'use client';

import NewsletterForm from './NewsletterForm';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.newsletterContent}>
        <h2>Join Our Community</h2>
        <p>Get weekly inspiration, design tips, and exclusive decor finds delivered straight to your inbox.</p>
        <NewsletterForm />
      </div>
    </section>
  );
}
