// Conditional Layout Wrapper - Only shows Header/Footer on non-admin pages
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const keyBufferRef = useRef('');
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;

    const secretCode = 'tmkdoadmin';

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingField = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if (isTypingField) return;

      const key = event.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;

      keyBufferRef.current = (keyBufferRef.current + key).slice(-secretCode.length);

      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
      }

      clearTimerRef.current = setTimeout(() => {
        keyBufferRef.current = '';
      }, 3000);

      if (keyBufferRef.current === secretCode) {
        keyBufferRef.current = '';
        router.push('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
      }
    };
  }, [isAdminRoute, router]);

  if (isAdminRoute) {
    // Admin routes: no header/footer, just content
    return <>{children}</>;
  }

  // Regular routes: show header, content, newsletter, footer, and floating actions
  return (
    <>
      <Header />
      <main>{children}</main>
      <FloatingActions />
      <Footer />
    </>
  );
}
