import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com'),
  title: {
    default: 'Little Leaps | Baby Milestone Awards & Development Tracker',
    template: '%s | Little Leaps',
  },
  description:
    'Little Leaps helps parents celebrate every baby milestone with personalised awards, expert development guides, and a free age-tailored milestone quiz.',
  keywords: [
    'baby milestones', 'baby development tracker', 'milestone awards',
    'baby quiz', 'baby development', 'little leaps', 'first steps award',
  ],
  authors: [{ name: 'Little Leaps' }],
  openGraph: {
    type: 'website',
    siteName: 'Little Leaps',
    title: 'Little Leaps | Baby Milestone Awards & Development Tracker',
    description:
      'Celebrate every baby milestone with personalised awards and expert development guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Little Leaps | Baby Milestone Awards & Development Tracker',
    description:
      'Celebrate every baby milestone with personalised awards and expert development guidance.',
  },
  robots: { index: true, follow: true },
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
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
