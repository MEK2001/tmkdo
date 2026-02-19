// Admin Layout with Authentication
'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import LoginForm from '@/components/admin/LoginForm';
import AdminNav from '@/components/admin/AdminNav';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session, loading, setSession } = useAdmin();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <LoginForm onLoginSuccess={setSession} />;
  }

  return (
    <div className={styles.layout}>
      <AdminNav />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
