'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.copy}>&copy; {new Date().getFullYear()} The Minimalist Kraft & DO. All Rights Reserved.</p>
        <div className={styles.links}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
