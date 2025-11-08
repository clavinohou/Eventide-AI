'use client';

import { useState } from 'react';
import MarketingLayout from '@/components/MarketingLayout';
import SignupModal from '@/components/SignupModal';
import { CtaProvider } from '@/lib/CtaContext';
import PageTransition from '@/components/PageTransition';
import { ReactNode } from 'react';

export default function MarketingGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleCtaClick = () => {
    setSignupModalOpen(true);
  };

  return (
    <CtaProvider onCtaClick={handleCtaClick}>
      <MarketingLayout onCtaClick={handleCtaClick}>
        <PageTransition>
          {children}
        </PageTransition>
      </MarketingLayout>
      <SignupModal isOpen={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
    </CtaProvider>
  );
}
