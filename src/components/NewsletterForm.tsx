'use client';

import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter your email address" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
