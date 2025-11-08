import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cal-mgr.app'),
  title: 'CAL-MGR - Agentic Calendar Management',
  description: 'Transform any content into verified Google Calendar events. Share flyers, URLs, or text and let AI handle the rest.',
  keywords: ['calendar', 'event management', 'AI', 'productivity', 'scheduling'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cal-mgr.app',
    siteName: 'CAL-MGR',
    title: 'CAL-MGR - Agentic Calendar Management',
    description: 'Transform any content into verified Google Calendar events. Share flyers, URLs, or text and let AI handle the rest.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CAL-MGR - Transform Content to Calendar Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAL-MGR - Agentic Calendar Management',
    description: 'Transform any content into verified Google Calendar events.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0694ff" />
        <meta name="description" content="Transform any content into verified Google Calendar events. Share flyers, URLs, or text and let AI handle the rest." />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
