'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';

interface AgeSelectorProps {
  onSelect: (age: number) => void;
}

export default function AgeSelector({ onSelect }: AgeSelectorProps) {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">

      {/* Page heading */}
      <div className="w-full text-center">
        {/* Icon badge */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-lavender-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-lavender-500" viewBox="0 0 32 32" fill="none"
                 aria-hidden="true">
              <rect x="6" y="8" width="20" height="22" rx="4" stroke="currentColor"
                    strokeWidth="1.8"/>
              <path d="M12 16h8M12 20h6M12 24h4" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round"/>
              <rect x="11" y="5" width="10" height="6" rx="3" fill="#ede9fe"
                    stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Free Baby Milestone Quiz
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
          Find out how your baby is developing across 5 key areas — takes under 3 minutes.
        </p>
      </div>

      <div className="w-full text-center">
        <h2 className="text-base font-bold text-gray-700">How old is your baby?</h2>
        <p className="text-gray-400 mt-1 text-sm">
          We&apos;ll tailor every question to your baby&apos;s exact age.
        </p>
      </div>

      {/* Age slider */}
      <div className="w-full card-base p-5">
        <label htmlFor="exact-age" className="text-sm font-semibold text-gray-700 mb-3 block">
          Select age:{' '}
          {selectedAge !== null
            ? <span className="text-blush-500 font-bold">{selectedAge} {selectedAge === 1 ? 'month' : 'months'}</span>
            : <span className="text-gray-400 font-normal">move the slider</span>
          }
        </label>
        <input
          id="exact-age"
          type="range"
          min={1}
          max={24}
          value={selectedAge ?? 1}
          onChange={(e) => setSelectedAge(Number(e.target.value))}
          onMouseDown={() => { if (selectedAge === null) setSelectedAge(1); }}
          onTouchStart={() => { if (selectedAge === null) setSelectedAge(1); }}
          className="w-full accent-blush-500 cursor-pointer"
          aria-label={selectedAge ? `Baby age: ${selectedAge} months` : 'Select baby age'}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 month</span>
          <span>24 months</span>
        </div>
      </div>

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
