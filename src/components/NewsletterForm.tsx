'use client';

import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className={styles.visuallyHidden}>Form</label>
      <input id="newsletter-email" type="email" placeholder="Form" required />
      <button type="submit">Sign-up</button>
    </form>
  );
}
