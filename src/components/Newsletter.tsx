'use client';

import NewsletterForm from './NewsletterForm';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.newsletterContent}>
        <h2>Newsletter Section</h2>
        <p>Join Our Inner Circle</p>
        <NewsletterForm />
      </div>
    </section>
  );
}
