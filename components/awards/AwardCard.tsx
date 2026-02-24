import type { Award } from '@/types';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';

interface AwardCardProps {
  award: Award;
}

export default function AwardCard({ award }: AwardCardProps) {
  return (
    <article className="card-base flex flex-col transition-transform duration-200
                        hover:-translate-y-1 hover:shadow-md">
      {/* Product image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <Image
          src={award.image.startsWith('/images') ? award.image : '/images/award-placeholder.svg'}
          alt={award.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        {award.badge && (
          <div className="absolute top-3 left-3">
            <Badge
              label={award.badge}
              color={
                award.badge === 'Bestseller' ? 'blush' :
                award.badge === 'New'        ? 'mint'  : 'lavender'
              }
            />
          </div>
        )}
        {!award.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-end p-3">
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full
                             border border-gray-200">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs font-semibold text-lavender-500 uppercase tracking-wide mb-1">
            {award.category} &middot; {award.ageRange}
          </p>
          <h3 className="text-base font-bold text-gray-800 leading-snug">{award.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{award.description}</p>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1.5 text-sm" aria-label={`Rating: ${award.rating} out of 5`}>
          <div className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(award.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                   viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
              </svg>
            ))}
          </div>
          <span className="font-semibold text-gray-700">{award.rating}</span>
          <span className="text-gray-400">({award.reviewCount})</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-blush-500"
                  aria-label={`Price: £${award.price.toFixed(2)}`}>
              £{award.price.toFixed(2)}
            </span>
            {award.originalPrice && (
              <span className="text-sm text-gray-400 line-through"
                    aria-label={`Was: £${award.originalPrice.toFixed(2)}`}>
                £{award.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            disabled={!award.inStock}
            aria-label={award.inStock ? `Add ${award.title} to bag` : `${award.title} out of stock`}
            className="tap-target px-4 py-2 rounded-full text-sm font-bold
                       bg-gradient-to-r from-blush-500 to-lavender-500 text-white
                       hover:from-blush-600 hover:to-lavender-600 transition-all
                       disabled:opacity-40 disabled:cursor-not-allowed
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2"
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
