'use client';

// Updated: February 23, 2026
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

interface PublicSettings {
  siteTitle?: string;
  socialLinks?: {
    instagram?: string;
    pinterest?: string;
    twitter?: string;
  };
}

export default function Footer() {
  const [publicSettings, setPublicSettings] = useState<PublicSettings | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/settings.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data?.settings) return;
        setPublicSettings(data.settings);
      })
      .catch(() => {
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const instagramUrl = publicSettings?.socialLinks?.instagram || 'https://www.instagram.com/_tmkdo?igsh=bWozMGhkOWJ5NzJk';
  const pinterestUrl = publicSettings?.socialLinks?.pinterest || 'https://pin.it/g0mJ8xDh2';
  const siteTitle = publicSettings?.siteTitle || 'The Minimalist Kraft & DO';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.copy}>&copy; {new Date().getFullYear()} {siteTitle}. All Rights Reserved.</p>
        <div className={styles.links}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div className={styles.socials}>
          <a href={pinterestUrl} target="_blank" rel="noopener noreferrer" aria-label="Pinterest" title="Pinterest">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.238 2.636 7.86 6.356 9.313-.088-.791-.166-2.006.034-2.87.181-.781 1.166-4.977 1.166-4.977s-.297-.594-.297-1.472c0-1.379.8-2.409 1.796-2.409.847 0 1.255.635 1.255 1.397 0 .851-.542 2.124-.821 3.304-.234.988.495 1.793 1.468 1.793 1.761 0 3.113-1.857 3.113-4.538 0-2.372-1.705-4.033-4.14-4.033-2.821 0-4.477 2.116-4.477 4.302 0 .853.329 1.769.741 2.265.082.1.094.188.07.29-.077.318-.247 1.006-.281 1.147-.044.182-.145.22-.336.132-1.25-.582-2.032-2.41-2.032-3.88 0-3.158 2.294-6.058 6.614-6.058 3.472 0 6.173 2.474 6.173 5.779 0 3.448-2.174 6.222-5.192 6.222-1.014 0-1.969-.526-2.295-1.148l-.624 2.379c-.226.87-.838 1.959-1.248 2.624.94.29 1.938.447 2.972.447 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
