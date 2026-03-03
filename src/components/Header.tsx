'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((value) => !value);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navGroupLeft}>
          <Link href="/" onClick={closeMobileMenu}>Home</Link>
          <span>/</span>
          <Link href="/about" onClick={closeMobileMenu}>About</Link>
        </div>

        <Link href="/" className={styles.centerLogo} onClick={closeMobileMenu} aria-label="Home">
          <Image
            src="/logo.svg"
            alt="TMKDO Logo"
            width={58}
            height={58}
            className={styles.logoImage}
            priority
          />
          <span className={styles.brandName}>The Minimalist Kraft & DO</span>
        </Link>

        <div className={styles.navGroupRight}>
          <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
          <span>/</span>
          <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
        </div>

        <button
          className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.active : ''}`}>
          <li>
            <Link href="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={closeMobileMenu}>About</Link>
          </li>
          <li>
            <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
