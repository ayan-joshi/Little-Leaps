import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import productAwardsData from '@/data/productAwards.json';
import type { ProductAwardsData } from '@/types';
import AwardsClient from '@/components/awards/AwardsClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com';

export const metadata: Metadata = {
  title: 'Baby Product Awards 2026 — Gold & Silver Winners',
  description:
    'The Little Leaps Baby Awards 2026 — Gold and Silver winners for the best baby products, expert-tested across Gross Motor, Sensory, Language, Sleep, Feeding, Safety, and Skincare.',
  keywords: [
    'baby awards 2026', 'best baby products 2026', 'baby product awards',
    'best baby development toys', 'best baby monitor', 'best baby skincare',
    'best baby feeding products', 'best baby carrier', 'little leaps baby awards',
  ],
  alternates: { canonical: `${BASE_URL}/awards` },
  openGraph: {
    title: 'Little Leaps Baby Awards 2026 — Best Baby Products',
    description: 'Expert-tested Gold & Silver award winners across every developmental category.',
    url: `${BASE_URL}/awards`,
  },
};

const data = productAwardsData as ProductAwardsData;

function buildAwardsSchema() {
  const items: object[] = [];
  let position = 1;

  for (const [year, categories] of Object.entries(data)) {
    for (const [category, awards] of Object.entries(
      categories as Record<string, {
        gold: { name: string; brand: string; description: string; slug: string };
        silver: { name: string; brand: string; description: string; slug: string };
      }>
    )) {
      if (awards.gold) {
        items.push({
          '@type': 'ListItem', position: position++,
          name: `${awards.gold.brand} ${awards.gold.name} — ${year} ${category} Gold Award`,
          description: awards.gold.description,
          url: `${BASE_URL}/awards/${awards.gold.slug}`,
        });
      }
      if (awards.silver) {
        items.push({
          '@type': 'ListItem', position: position++,
          name: `${awards.silver.brand} ${awards.silver.name} — ${year} ${category} Silver Award`,
          description: awards.silver.description,
          url: `${BASE_URL}/awards/${awards.silver.slug}`,
        });
      }
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Little Leaps Baby Awards 2026',
    description: 'Expert-tested Gold and Silver award winners for the best baby products.',
    url: `${BASE_URL}/awards`,
    numberOfItems: items.length,
    itemListElement: items,
  };
}

// ─── Evaluation criteria data ─────────────────────────────────────────────────

const criteria = [
  {
    emoji: '🛡',
    title: 'Safety First',
    color: 'text-blush-500 bg-blush-50',
    description: 'BIS, BPA-free, phthalate-free, and age-appropriate construction. Any safety fail = immediate exclusion.',
  },
  {
    emoji: '🧠',
    title: 'Developmental Impact',
    color: 'text-lavender-600 bg-lavender-50',
    description: 'How directly the product supports a specific milestone — and whether that link is research-backed.',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Real Parent Testing',
    color: 'text-amber-600 bg-amber-50',
    description: '4–6 weeks of daily use by parents with babies in the target age range. No lab conditions.',
  },
  {
    emoji: '📅',
    title: 'Longevity & Value',
    color: 'text-green-600 bg-green-50',
    description: 'Products that grow with the baby score higher than those that become irrelevant after a single stage.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AwardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAwardsSchema()) }}
      />

      {/* ── Page header — compact on mobile ──────────────────────────── */}
      <div className="page-padding pt-8 pb-4 sm:pt-12 sm:pb-6 max-w-6xl mx-auto">

        {/* Trophy + title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 flex-shrink-0
                          flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" viewBox="0 0 32 32"
                 fill="none" aria-hidden="true">
              <path d="M10 28h12M16 28v-6" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round"/>
              <path d="M10 8h12v8a6 6 0 01-12 0V8z" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 12H7a2 2 0 000 4h3M22 12h3a2 2 0 010 4h-3"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
              2026 Awards
            </p>
            <h1 className="text-xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
              Little Leaps Baby Awards
            </h1>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed max-w-lg ml-0 mb-3">
          Expert-tested Gold &amp; Silver winners across 8 developmental categories.
          Tap a category to filter.
        </p>

        {/* Quick stats strip */}
        <div className="flex gap-4 text-xs text-gray-400">
          <span><strong className="text-gray-600">200+</strong> products tested</span>
          <span className="text-gray-200">|</span>
          <span><strong className="text-gray-600">8</strong> categories</span>
          <span className="text-gray-200">|</span>
          <span><strong className="text-gray-600">16</strong> winners</span>
        </div>
      </div>

      {/* ── Award grid (with sticky pill nav inside) ─────────────────── */}
      <div className="page-padding pb-4 max-w-6xl mx-auto">
        <Suspense fallback={
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            Loading awards…
          </div>
        }>
          <AwardsClient data={data} />
        </Suspense>
      </div>

      {/* ── How We Evaluate ── below the grid so mobile users see winners first */}
      <section className="page-padding py-10 sm:py-14 bg-white/60"
               aria-labelledby="evaluation-heading">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2 id="evaluation-heading"
                className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">
              How We Evaluate
            </h2>
            <p className="text-sm text-gray-500 max-w-md">
              Every winner passes a four-part framework — not marketing claims.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            {criteria.map(({ emoji, title, color, description }) => (
              <div key={title} className="card-base p-4 sm:p-5 flex gap-3 items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center
                                 justify-center text-lg ${color}`}>
                  {emoji}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-0.5">{title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nominate a product ───────────────────────────────────────── */}
      <section className="page-padding py-8 sm:py-12" aria-labelledby="nominate-heading">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-lavender-50 to-blush-50 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white shadow-sm
                                flex items-center justify-center">
                  <svg className="w-5 h-5 text-lavender-500" viewBox="0 0 24 24" fill="none"
                       aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h2 id="nominate-heading" className="text-base font-bold text-gray-800 mb-1">
                    Nominate a Product
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Know a product that deserves to be here? Share the name, brand,
                    and why it stands out developmentally.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 w-full sm:w-auto text-center bg-gradient-to-r
                           from-blush-500 to-lavender-500 text-white font-bold px-6 py-3
                           rounded-full text-sm hover:from-blush-600 hover:to-lavender-600
                           active:scale-95 transition-all focus:outline-none
                           focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quiz CTA ─────────────────────────────────────────────────── */}
      <section className="page-padding pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center bg-white border border-gray-100 rounded-3xl p-6 sm:p-8
                          shadow-sm">
            <p className="text-base font-bold text-gray-800 mb-1">
              Wondering where your baby is at?
            </p>
            <p className="text-gray-500 text-sm mb-5">
              Take our free milestone quiz — tailored to your baby&apos;s exact age.
            </p>
            <Link
              href="/quiz"
              className="inline-block w-full sm:w-auto text-center bg-gradient-to-r
                         from-blush-500 to-lavender-500 text-white font-bold px-6 py-3.5
                         rounded-full text-sm hover:from-blush-600 hover:to-lavender-600
                         active:scale-95 transition-all focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2"
            >
              Take the Free Milestone Quiz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
