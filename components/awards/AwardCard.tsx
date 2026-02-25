import type { ProductAwardWinner } from '@/types';
import Image from 'next/image';

interface AwardCardProps {
  winner: ProductAwardWinner;
  tier: 'gold' | 'silver';
  category: string;
}

const tierConfig = {
  gold: {
    label: 'Gold Award',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    starClass: 'text-amber-400',
  },
  silver: {
    label: 'Silver Award',
    badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
    starClass: 'text-slate-400',
  },
} as const;

export default function AwardCard({ winner, tier, category }: AwardCardProps) {
  const config = tierConfig[tier];

  return (
    <article className="card-base flex flex-col transition-transform duration-200
                        hover:-translate-y-1 hover:shadow-md">
      {/* Product image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <Image
          src={winner.image.startsWith('/images') ? winner.image : '/images/award-placeholder.svg'}
          alt={`${winner.name} by ${winner.brand}`}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tier badge */}
        <div className="flex items-center gap-1.5 w-fit">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.badgeClass}`}>
            <svg className={`w-3.5 h-3.5 ${config.starClass}`} viewBox="0 0 16 16" fill="currentColor"
                 aria-hidden="true">
              <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
            </svg>
            {config.label}
          </span>
        </div>

        {/* Name & brand */}
        <div>
          <h3 className="text-base font-bold text-gray-800 leading-snug">{winner.name}</h3>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-0.5">
            {winner.brand}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-3">{winner.description}</p>
      </div>
    </article>
  );
}
