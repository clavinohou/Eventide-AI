import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MarketingLayout from '@/components/MarketingLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CAL-MGR | AI-Powered Calendar Management',
  description: 'Transform your calendar with AI. CAL-MGR automatically extracts events from flyers, websites, and text, then adds them to your calendar.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MarketingLayout>
          {children}
        </MarketingLayout>
      </body>
    </html>
  );
}