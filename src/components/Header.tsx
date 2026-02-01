'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { siteMetadata } from '@/lib/metadata';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll behavior for compact mode and transparency
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Set scrolling state
          setIsScrolling(true);
          
          // Clear existing timeout
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          
          // Set new timeout to detect when scrolling stops
          const timeout = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
          setScrollTimeout(timeout);
          
          // Detect if scrolled (for compact mode)
          if (currentScrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isScrolling ? styles.scrolling : ''}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
          <img 
            src={siteMetadata.logo} 
            alt="TMKDO Logo" 
            className={styles.logo}
            width={72}
            height={72}
            loading="eager"
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
          <li>
            <Link href="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className={styles.navItemWithDropdown}>
            <Link href="/blog" onClick={closeMobileMenu} className={styles.navLink}>
              Blog
            </Link>
            <div className={styles.dropdown}>
              <ul className={styles.dropdownList}>
                <li>
                  <Link href="/blog" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=Living Room" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    Living Room
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=Organization" onClick={closeMobileMenu} className={styles.dropdownLink}>
                    Organization
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=Materials" onClick={closeMobileMenu} className={styles.dropdownLink}>
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
