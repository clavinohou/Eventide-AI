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
    <div className="min-h-screen flex flex-col relative">
      {/* Sky/Cloud Background Treatment */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Sky Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-sky-50 to-white" />
        
        {/* Soft Cloud Layers */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-white via-blue-50/30 to-transparent rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-white via-sky-100/40 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-white via-blue-100/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/3 w-[450px] h-[450px] bg-gradient-radial from-white via-sky-50/30 to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      
      <Header onCtaClick={onCtaClick} />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
