'use client';

import { createContext, useContext, ReactNode } from 'react';

interface CtaContextType {
  onCtaClick: () => void;
}

const CtaContext = createContext<CtaContextType | undefined>(undefined);

export function CtaProvider({ children, onCtaClick }: { children: ReactNode; onCtaClick: () => void }) {
  return (
    <CtaContext.Provider value={{ onCtaClick }}>
      {children}
    </CtaContext.Provider>
  );
}

export function useCtaClick() {
  const context = useContext(CtaContext);
  if (!context) {
    throw new Error('useCtaClick must be used within CtaProvider');
  }
  return context.onCtaClick;
}
