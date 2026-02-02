'use client';

import { useTheme } from './ThemeProvider';
import styles from './FloatingDecorBackground.module.css';

export default function FloatingDecorBackground() {
  const { theme } = useTheme();

  return (
    <div className={`${styles.floatingContainer} ${styles[`theme-${theme}`]}`}>
      {/* Floating Vase */}
      <svg
        className={`${styles.floatingItem} ${styles.item1}`}
        viewBox="0 0 100 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 30 20 Q 20 30, 20 50 L 20 100 Q 20 110, 30 110 L 70 110 Q 80 110, 80 100 L 80 50 Q 80 30, 70 20 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Floating Plant */}
      <svg
        className={`${styles.floatingItem} ${styles.item2}`}
        viewBox="0 0 80 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M 40 100 L 40 60" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M 40 70 Q 30 60, 25 50" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M 40 70 Q 50 60, 55 50" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M 40 80 Q 25 75, 20 65" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M 40 80 Q 55 75, 60 65" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Floating Pendant Lamp */}
      <svg
        className={`${styles.floatingItem} ${styles.item3}`}
        viewBox="0 0 60 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="30" y1="10" x2="30" y2="25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M 15 25 Q 15 35, 20 40 L 40 40 Q 45 35, 45 25 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="30" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Floating Side Table */}
      <svg
        className={`${styles.floatingItem} ${styles.item4}`}
        viewBox="0 0 70 70"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="15" y="15" width="40" height="35" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="50" x2="15" y2="65" stroke="currentColor" strokeWidth="1.2" />
        <line x1="50" y1="50" x2="55" y2="65" stroke="currentColor" strokeWidth="1.2" />
        <line x1="25" y1="50" x2="25" y2="65" stroke="currentColor" strokeWidth="1.2" />
        <line x1="45" y1="50" x2="45" y2="65" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Floating Cushion */}
      <svg
        className={`${styles.floatingItem} ${styles.item5}`}
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="10" y="10" width="40" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M 15 25 Q 30 35, 45 25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>

      {/* Floating Abstract Shelf */}
      <svg
        className={`${styles.floatingItem} ${styles.item6}`}
        viewBox="0 0 80 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="10" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="1.5" />
        <line x1="15" y1="10" x2="15" y2="25" stroke="currentColor" strokeWidth="1.2" />
        <line x1="65" y1="10" x2="65" y2="25" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Floating Leaf */}
      <svg
        className={`${styles.floatingItem} ${styles.item7}`}
        viewBox="0 0 60 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 30 10 Q 40 25, 45 45 Q 40 50, 30 50 Q 20 50, 15 45 Q 20 25, 30 10 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="30" y1="10" x2="30" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Floating Simple Vase 2 */}
      <svg
        className={`${styles.floatingItem} ${styles.item8}`}
        viewBox="0 0 50 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 15 10 Q 10 20, 12 35 L 12 70 Q 12 78, 20 78 L 30 78 Q 38 78, 38 70 L 38 35 Q 40 20, 35 10 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
