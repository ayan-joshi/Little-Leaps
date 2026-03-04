import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import productAwardsData from '@/data/productAwards.json';
import type { ProductAwardsData, ProductAwardWinner } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com';
const data = productAwardsData as ProductAwardsData;

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface AwardEntry {
  winner: ProductAwardWinner;
  tier: 'gold' | 'silver';
  category: string;
  year: string;
}

function findBySlug(slug: string): AwardEntry | null {
  for (const [year, categories] of Object.entries(data)) {
    for (const [category, awards] of Object.entries(categories)) {
      for (const tier of ['gold', 'silver'] as const) {
        if (awards[tier].slug === slug) {
          return { winner: awards[tier], tier, category, year };
        }
      }
    }
  }
  return null;
}

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  for (const categories of Object.values(data)) {
    for (const awards of Object.values(categories)) {
      slugs.push({ slug: awards.gold.slug });
      slugs.push({ slug: awards.silver.slug });
    }
  }
  return slugs;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const entry = findBySlug(slug);
  if (!entry) return { title: 'Award Not Found' };

  const { winner, tier, category, year } = entry;
  const tierLabel = tier === 'gold' ? 'Gold' : 'Silver';

  return {
    title: `${winner.name} by ${winner.brand} — ${year} ${category} ${tierLabel} Award`,
    description: winner.description,
    alternates: { canonical: `${BASE_URL}/awards/${slug}` },
    openGraph: {
      title: `${winner.brand} ${winner.name} — ${tierLabel} Award Winner`,
      description: winner.description,
      url: `${BASE_URL}/awards/${slug}`,
    },
  };
}

// ─── Tier config ──────────────────────────────────────────────────────────────

const tierConfig = {
  gold: {
    label: 'Gold Award',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    accentClass: 'text-amber-500',
    bgClass: 'bg-amber-50',
    starClass: 'text-amber-400',
  },
  silver: {
    label: 'Silver Award',
    badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
    accentClass: 'text-slate-500',
    bgClass: 'bg-slate-50',
    starClass: 'text-slate-400',
  },
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AwardProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = findBySlug(slug);
  if (!entry) notFound();

  const { winner, tier, category, year } = entry;
  const config = tierConfig[tier];

  return (
    <div className="section-padding page-padding">
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/awards"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600
                     transition-colors mb-8 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
               viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Awards
        </Link>

        {/* Hero card */}
        <article className="card-base overflow-hidden">

          {/* Product image */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <Image
              src={winner.image.startsWith('/images') ? winner.image : '/images/award-placeholder.svg'}
              alt={`${winner.name} by ${winner.brand}`}
              width={800}
              height={400}
              className="w-full h-64 sm:h-80 object-cover"
              priority
            />
            {/* Year badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full
                            px-3 py-1 text-xs font-bold text-gray-600 shadow-sm">
              {year} Awards
            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* Tier + category badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full
                               text-xs font-semibold ${config.badgeClass}`}>
                <svg className={`w-3.5 h-3.5 ${config.starClass}`} viewBox="0 0 16 16"
                     fill="currentColor" aria-hidden="true">
                  <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
                </svg>
                {config.label}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs
                               font-semibold bg-lavender-50 text-lavender-700 border border-lavender-200">
                {category}
              </span>
            </div>

            {/* Name & brand */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug mb-1">
              {winner.name}
            </h1>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              {winner.brand}
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {winner.description}
            </p>

            {/* Why it won */}
            <div className={`rounded-2xl ${config.bgClass} p-6 mb-8`}>
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                Why It Won
              </h2>
              <ol className="flex flex-col gap-4">
                {winner.awardReasons.map((reason, i) => (
                  <li key={i} className="flex gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center
                                      justify-center text-xs font-bold text-white
                                      ${tier === 'gold' ? 'bg-amber-400' : 'bg-slate-400'}`}>
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed pt-0.5">{reason}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Product link */}
            <div className="border border-dashed border-gray-200 rounded-2xl p-5 text-center">
              {winner.productUrl ? (
                <a
                  href={winner.productUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blush-500
                             to-lavender-500 text-white font-bold px-6 py-3 rounded-full
                             text-sm hover:from-blush-600 hover:to-lavender-600 transition-all
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400
                             focus-visible:ring-offset-2"
                >
                  View Product
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ) : (
                <p className="text-sm text-gray-400">
                  Product link coming soon
                </p>
              )}
            </div>

          </div>
        </article>

        {/* Back to awards */}
        <div className="mt-8 text-center">
          <Link
            href="/awards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-lavender-600
                       hover:text-lavender-700 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            See all {year} award winners
          </Link>
        </div>

      </div>
    </div>
  );
}
