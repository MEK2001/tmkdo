// Conditional Layout Wrapper - Only shows Header/Footer on non-admin pages
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes: no header/footer, just content
    return <>{children}</>;
  }

  // Regular routes: show header and footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
