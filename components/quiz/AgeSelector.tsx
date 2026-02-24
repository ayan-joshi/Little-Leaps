'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useState } from 'react';

interface AgeSelectorProps {
  onSelect: (age: number) => void;
}

const AGE_GROUPS = [
  { label: '1–3 months',   ages: [1, 2, 3] },
  { label: '4–6 months',   ages: [4, 5, 6] },
  { label: '7–9 months',   ages: [7, 8, 9] },
  { label: '10–12 months', ages: [10, 11, 12] },
  { label: '13–18 months', ages: [13, 14, 15, 16, 17, 18] },
  { label: '19–24 months', ages: [19, 20, 21, 22, 23, 24] },
];

export default function AgeSelector({ onSelect }: AgeSelectorProps) {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [showExact, setShowExact] = useState(false);

  const handleGroupSelect = (ages: number[]) => {
    setSelectedAge(ages[Math.floor(ages.length / 2)]);
    if (ages.length > 1) setShowExact(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">

      {/* Illustration */}
      <div className="w-full max-w-xs mx-auto">
        <Image
          src="/images/quiz-illustration.svg"
          alt="Baby milestone quiz illustration"
          width={360}
          height={260}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="text-center -mt-2">
        <h2 className="text-2xl font-bold text-gray-800">How old is your baby?</h2>
        <p className="text-gray-500 mt-2 text-sm">
          We&apos;ll tailor the quiz to your baby&apos;s age so every question is relevant.
        </p>
      </div>

      {/* Age group buttons */}
      <div className="grid grid-cols-2 gap-3 w-full" role="group" aria-label="Select baby age group">
        {AGE_GROUPS.map((group) => {
          const isSelected = selectedAge !== null && group.ages.includes(selectedAge);
          return (
            <button
              key={group.label}
              onClick={() => handleGroupSelect(group.ages)}
              aria-pressed={isSelected}
              className={[
                'tap-target rounded-2xl border-2 px-4 py-4 text-sm font-bold transition-all',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-blush-400 bg-blush-50 text-blush-700 scale-[1.02] shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blush-200 hover:bg-blush-50/50',
              ].join(' ')}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      {/* Exact age slider */}
      {showExact && selectedAge !== null && (
        <div className="w-full card-base p-5">
          <label htmlFor="exact-age" className="text-sm font-semibold text-gray-700 mb-3 block">
            Exact age:{' '}
            <span className="text-blush-500 font-bold">{selectedAge} months</span>
          </label>
          <input
            id="exact-age"
            type="range"
            min={1}
            max={24}
            value={selectedAge}
            onChange={(e) => setSelectedAge(Number(e.target.value))}
            className="w-full accent-blush-500 cursor-pointer"
            aria-label={`Baby age: ${selectedAge} months`}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 month</span>
            <span>24 months</span>
          </div>
        </div>
      )}

      <Button
        size="lg"
        onClick={() => selectedAge && onSelect(selectedAge)}
        disabled={selectedAge === null}
        className="w-full sm:w-auto"
        aria-label={selectedAge ? `Start quiz for ${selectedAge}-month-old` : 'Select age to start'}
      >
        Start Quiz
        <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  );
}
