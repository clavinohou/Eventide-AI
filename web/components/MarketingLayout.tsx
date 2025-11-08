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
      {/* Sunset Gradient Background Treatment */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Sunset Gradient Base - Orange to Pink */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-pink-300 to-purple-200" />
        
        {/* Soft Cloud/Glow Layers with warm sunset tones */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-orange-200/60 via-orange-300/30 to-transparent rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-pink-200/70 via-pink-300/40 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-yellow-200/40 via-orange-200/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/3 w-[450px] h-[450px] bg-gradient-radial from-rose-200/50 via-pink-200/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-[550px] h-[550px] bg-gradient-radial from-purple-200/40 via-purple-300/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2" />
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
