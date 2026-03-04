'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ProductAwardsData } from '@/types';
import AwardCard from './AwardCard';

interface AwardsClientProps {
  data: ProductAwardsData;
}

export default function AwardsClient({ data }: AwardsClientProps) {
  const years = Object.keys(data).sort().reverse();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);

  const [selectedYear, setSelectedYear] = useState<string>(years[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Pre-select from URL ?category=
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && Object.keys(data[years[0]]).includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams, data, years]);

  // Scroll active pill into view whenever category changes
  useEffect(() => {
    activePillRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [selectedCategory]);

  const categories = ['All', ...Object.keys(data[selectedYear])];

  const displayed: [string, { gold: import('@/types').ProductAwardWinner; silver: import('@/types').ProductAwardWinner }][] =
    selectedCategory === 'All'
      ? Object.entries(data[selectedYear])
      : [[selectedCategory, data[selectedYear][selectedCategory]]];

  function handleCategorySelect(cat: string) {
    setSelectedCategory(cat);
    // Scroll grid back to top on mobile when filter changes
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function handleYearChange(year: string) {
    setSelectedYear(year);
    setSelectedCategory('All');
  }

  const winnerCount = displayed.length * 2;

  return (
    <div>
      {/* ── Sticky pill nav ─────────────────────────────────────────────────
          top-16 = 64px header height. Bleeds edge-to-edge on mobile via
          -mx-4 sm:mx-0, contained on desktop.                              */}
      <div className="sticky top-16 z-40 -mx-4 sm:mx-0
                      bg-[#fef9f0]/95 backdrop-blur-sm border-b border-gray-100">

        {/* Year row — only rendered when there are multiple years */}
        {years.length > 1 && (
          <div className="flex items-center gap-2 px-4 sm:px-0 pt-2.5 pb-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
              Year
            </span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  selectedYear === year
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {/* Category pills — horizontal scroll, hidden scrollbar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-0 py-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                ref={isActive ? activePillRef : null}
                onClick={() => handleCategorySelect(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold
                            transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-blush-500 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-blush-300 hover:text-blush-500'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results meta */}
      <p className="text-xs text-gray-400 mt-6 mb-5 px-0.5">
        {selectedCategory === 'All'
          ? `${displayed.length} categories · ${winnerCount} award winners`
          : `${winnerCount} winners · ${selectedYear}`}
      </p>

      {/* ── Award sections ──────────────────────────────────────────────── */}
      <div className="space-y-6 sm:space-y-10" ref={gridRef}>
        {displayed.map(([categoryName, winners]) => (
          <section key={categoryName}>

            {/* Category divider — only in "All" view */}
            {selectedCategory === 'All' && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest
                                 px-2 whitespace-nowrap">
                  {categoryName}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            )}

            {/* Cards — 1 col on mobile (horizontal card), 2 col on sm+ (vertical card) */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-5">
              <AwardCard winner={winners.gold} tier="gold" category={categoryName} />
              <AwardCard winner={winners.silver} tier="silver" category={categoryName} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
