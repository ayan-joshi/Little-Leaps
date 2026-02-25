'use client';

import { useState } from 'react';
import type { ProductAwardsData } from '@/types';
import AwardCard from './AwardCard';

interface AwardsClientProps {
  data: ProductAwardsData;
}

export default function AwardsClient({ data }: AwardsClientProps) {
  const years = Object.keys(data).sort().reverse();

  const [selectedYear, setSelectedYear] = useState<string>(years[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Object.keys(data[selectedYear])];

  const displayed: [string, { gold: import('@/types').ProductAwardWinner; silver: import('@/types').ProductAwardWinner }][] =
    selectedCategory === 'All'
      ? Object.entries(data[selectedYear])
      : [[selectedCategory, data[selectedYear][selectedCategory]]];

  function handleYearChange(year: string) {
    setSelectedYear(year);
    setSelectedCategory('All');
  }

  return (
    <div>
      {/* Dropdowns */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="flex flex-col gap-1">
          <label htmlFor="year-select" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Year
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold
                       text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2
                       focus-visible:ring-blush-400 focus-visible:ring-offset-1 cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category-select" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold
                       text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2
                       focus-visible:ring-blush-400 focus-visible:ring-offset-1 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-10">
        {displayed.map(([categoryName, winners]) => (
          <section key={categoryName}>
            {/* Only show heading when showing all categories */}
            {selectedCategory === 'All' && (
              <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">
                {categoryName}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AwardCard winner={winners.gold} tier="gold" category={categoryName} />
              <AwardCard winner={winners.silver} tier="silver" category={categoryName} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
