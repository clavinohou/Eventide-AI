'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MarketingLayoutProps {
  children: ReactNode;
  onCtaClick?: () => void;
}

export default function MarketingLayout({ children, onCtaClick }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onCtaClick={onCtaClick} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
