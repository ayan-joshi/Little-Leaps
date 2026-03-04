import type { ProductAwardWinner } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface AwardCardProps {
  winner: ProductAwardWinner;
  tier: 'gold' | 'silver';
  category: string;
}

const tierConfig = {
  gold: {
    label: 'Gold',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    starClass: 'text-amber-400',
    rimClass: 'border-l-2 border-l-amber-300 sm:border-l-0 sm:border-t-2 sm:border-t-amber-300',
  },
  silver: {
    label: 'Silver',
    badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
    starClass: 'text-slate-400',
    rimClass: 'border-l-2 border-l-slate-300 sm:border-l-0 sm:border-t-2 sm:border-t-slate-300',
  },
} as const;

export default function AwardCard({ winner, tier, category }: AwardCardProps) {
  const config = tierConfig[tier];

  return (
    <Link
      href={`/awards/${winner.slug}`}
      className={`card-base flex flex-row sm:flex-col transition-all duration-200
                  hover:shadow-md active:scale-[0.98] focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2
                  group ${config.rimClass}`}
      aria-label={`${config.label} Award: ${winner.name} by ${winner.brand} — ${category}`}
    >
      {/* ── Image ─────────────────────────────────────────────────────────
          Mobile:  88 × 88 px square on the left
          Desktop: full-width 176 px tall on top                          */}
      <div className="relative w-[88px] h-[88px] sm:w-full sm:h-44 flex-shrink-0">
        <Image
          src={winner.image.startsWith('/images') ? winner.image : '/images/award-placeholder.svg'}
          alt={`${winner.name} by ${winner.brand}`}
          fill
          sizes="(max-width: 640px) 88px, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-3 sm:p-5 gap-1.5 sm:gap-2.5 min-w-0">

        {/* Tier badge */}
        <span className={`inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full
                          text-xs font-semibold ${config.badgeClass}`}>
          <svg className={`w-3 h-3 ${config.starClass}`} viewBox="0 0 16 16"
               fill="currentColor" aria-hidden="true">
            <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
          </svg>
          {config.label}
        </span>

        {/* Name */}
        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2
                       group-hover:text-blush-600 transition-colors">
          {winner.name}
        </h3>

        {/* Brand */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
          {winner.brand}
        </p>

        {/* Description — desktop only */}
        <p className="hidden sm:block text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {winner.description}
        </p>

        {/* "Why it won" — always visible (not hover-dependent) */}
        <div className="mt-auto pt-1.5 flex items-center gap-1 text-xs font-semibold
                        text-lavender-500 group-hover:gap-2 transition-all">
          Why it won
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none"
               aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
