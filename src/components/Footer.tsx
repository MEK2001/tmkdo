import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>The Minimalist Kraft & DO</h3>
          <p>Your guide to intentional living and beautiful, functional spaces that inspire calm and creativity.</p>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <Link href="/">Blog</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
        
        <div className={styles.footerSection}>
          <h3>Categories</h3>
          <p>Living Room Decor</p>
          <p>Minimalist Tips</p>
          <p>Natural Materials</p>
          <p>Decluttering Guides</p>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} The Minimalist Kraft & DO. All rights reserved.</p>
      </div>
    </footer>
  );
}
