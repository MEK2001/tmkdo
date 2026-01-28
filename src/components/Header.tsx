'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
          <Image 
            src="/logo.svg" 
            alt="TMKDO Logo" 
            width={45} 
            height={45} 
            className={styles.logo}
            priority
          />
          <span className={styles.brandName}>The Minimalist Kraft & DO</span>
        </Link>
        
        <button
          className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          <li className={styles.navItemWithDropdown}>
            <Link href="/" onClick={closeMobileMenu} className={styles.navLink}>
              Blog
            </Link>
            <div className={styles.dropdown}>
              <ul className={styles.dropdownList}>
                <li>
                  <Link href="/" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link href="/?category=living-room" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    Living Room
                  </Link>
                </li>
                <li>
                  <Link href="/?category=organization" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    Organization
                  </Link>
                </li>
                <li>
                  <Link href="/?category=materials" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    Natural Materials
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link href="/about" onClick={closeMobileMenu}>About</Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMobileMenu}>Contact Us</Link>
          </li>
          <li>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
