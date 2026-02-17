// Admin Root Layout - Wraps all admin pages with authentication
'use client';

import { AdminProvider, useAdmin } from '@/components/admin/AdminContext';
import LoginForm from '@/components/admin/LoginForm';
import AdminNav from '@/components/admin/AdminNav';
import styles from './layout.module.css';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
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

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
