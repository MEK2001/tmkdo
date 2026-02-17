'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { siteMetadata } from '@/lib/metadata';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

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
    if (mobileMenuOpen) {
      setMobileDropdownOpen(false); // Close dropdown when closing menu
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  const toggleMobileDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isScrolling ? styles.scrolling : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.leftControls}>
          <Link href="/" className={styles.centerLogo} onClick={closeMobileMenu} aria-label="Home">
            <Image 
              src="/logo.svg" 
              alt="TMKDO Logo" 
              width={70} 
              height={70}
              className={styles.logoImage}
              priority
            />
          </Link>
          <Link 
            href="/admin/login.html" 
            className={styles.cmsLink}
            aria-label="Open TMKDO CMS (admin)"
          >
            <svg 
              stroke="currentColor" 
              fill="none" 
              strokeWidth="1.5" 
              viewBox="0 0 24 24" 
              aria-hidden="true" 
              className={styles.cmsIcon}
              height="1em" 
              width="1em" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
          </Link>
          <Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
            <span className={styles.brandName}>The Minimalist Kraft & DO</span>
          </Link>
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

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          <li className={styles.mobileOnly}>
            <Link 
              href="/admin/login.html" 
              onClick={closeMobileMenu}
              className={styles.mobileAdminLink}
            >
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="1.5" 
                viewBox="0 0 24 24" 
                aria-hidden="true" 
                className={styles.mobileAdminIcon}
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
              <span>Admin Login</span>
            </Link>
          </li>
          <li>
            <Link href="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className={styles.navItemWithDropdown}>
            <Link 
              href="/blog" 
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  toggleMobileDropdown(e);
                } else {
                  closeMobileMenu();
                }
              }} 
              className={styles.navLink}
            >
              Blog
            </Link>
            <div className={`${styles.dropdown} ${mobileDropdownOpen ? styles.dropdownOpen : ''}`}>
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
        </ul>
      </nav>
    </header>
  );
}
