'use client';

import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>The Minimalist Kraft & DO</h3>
          <p>Your guide to intentional living and beautiful, functional spaces that inspire calm and creativity.</p>
          <div className={styles.socialIcons}>
            <a 
              href="https://twitter.com/tmkdo" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow TMKDO on Twitter"
              title="Follow us on Twitter"
              className={`${styles.socialIcon} ${styles.twitter}`}
            >
              <FaTwitter />
            </a>
            <a 
              href="https://facebook.com/tmkdo" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow TMKDO on Facebook"
              title="Follow us on Facebook"
              className={`${styles.socialIcon} ${styles.facebook}`}
            >
              <FaFacebook />
            </a>
            <a 
              href="https://instagram.com/tmkdo" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow TMKDO on Instagram"
              title="Follow us on Instagram"
              className={`${styles.socialIcon} ${styles.instagram}`}
            >
              <FaInstagram />
            </a>
            <a 
              href="https://pinterest.com/tmkdo" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow TMKDO on Pinterest"
              title="Follow us on Pinterest"
              className={`${styles.socialIcon} ${styles.pinterest}`}
            >
              <FaPinterest />
            </a>
          </div>
        </div>
        
        <nav className={styles.footerSection} aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <ul className={styles.quickLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <div className={styles.footerSection}>
          <h3>Categories</h3>
          <ul className={styles.categoryList}>
            <li><Link href="/?category=Living Room" className={styles.categoryLink}>Living Room</Link></li>
            <li><Link href="/?category=Organization" className={styles.categoryLink}>Organization</Link></li>
            <li><Link href="/?category=Materials" className={styles.categoryLink}>Natural Materials</Link></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} The Minimalist Kraft & DO. All rights reserved.</p>
      </div>
    </footer>
  );
}
