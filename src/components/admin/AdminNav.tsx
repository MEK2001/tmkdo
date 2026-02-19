// Admin Navigation Sidebar
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAdmin } from './AdminContext';
import styles from './AdminNav.module.css';

export default function AdminNav() {
  const pathname = usePathname();
  const { session, logout } = useAdmin();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/posts', label: 'Posts', icon: '📝' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Image 
          src="/logo.svg" 
          alt="TMKDO Logo" 
          width={40} 
          height={40}
          className={styles.logoImage}
        />
        <h2>TMKDO CMS</h2>
      </div>

      <div className={styles.user}>
        <div className={styles.userAvatar}>
          {session?.user.email.charAt(0).toUpperCase()}
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{session?.user.full_name || 'Admin'}</p>
          <p className={styles.userEmail}>{session?.user.email}</p>
        </div>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.navItem} ${
                pathname === item.href ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={logout} className={styles.logoutBtn}>
        <span className={styles.icon}>🚪</span>
        <span>Logout</span>
      </button>
    </nav>
  );
}
