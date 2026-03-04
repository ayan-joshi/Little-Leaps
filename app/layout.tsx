import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Little Leaps | Baby Awards & Milestone Tracker',
    template: '%s | Little Leaps',
  },
  description:
    'Little Leaps Baby Awards — expert-tested Gold & Silver awards for the best baby products, plus a free milestone quiz and development guides for parents.',
  keywords: [
    'baby awards', 'best baby products', 'baby product awards', 'baby product awards 2026',
    'best baby monitor', 'best stroller', 'best baby diaper', 'best baby skincare',
    'baby milestones', 'baby development tracker', 'milestone awards',
    'baby quiz', 'baby development', 'little leaps',
  ],
  authors: [{ name: 'Little Leaps' }],
  openGraph: {
    type: 'website',
    siteName: 'Little Leaps',
    title: 'Little Leaps | Baby Awards & Milestone Tracker',
    description:
      'Expert-tested baby product awards, free milestone quiz, and development guides — all in one place for parents.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Little Leaps | Baby Awards & Milestone Tracker',
    description:
      'Expert-tested baby product awards, free milestone quiz, and development guides — all in one place for parents.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Little Leaps',
  url: BASE_URL,
  description:
    'Little Leaps Baby Awards — expert-tested Gold & Silver awards for the best baby products, plus a free milestone quiz and development guides.',
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
