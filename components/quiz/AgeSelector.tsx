'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useState } from 'react';

interface AgeSelectorProps {
  onSelect: (age: number) => void;
}

export default function AgeSelector({ onSelect }: AgeSelectorProps) {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

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
