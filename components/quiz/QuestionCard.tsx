'use client';

import type { QuizQuestion } from '@/types';
import Badge from '@/components/ui/Badge';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedValue: string | null;
  onSelect: (value: string, score: number) => void;
}

const categoryColors: Record<string, 'blush' | 'mint' | 'sky' | 'lavender' | 'peach'> = {
  gross_motor: 'mint',
  fine_motor: 'sky',
  language: 'lavender',
  cognitive: 'peach',
  social_emotional: 'blush',
};

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="card-base p-6 sm:p-8 w-full max-w-xl mx-auto animate-[fadeIn_0.3s_ease-in]">
      {/* Category badge */}
      <div className="mb-4">
        <Badge
          label={question.categoryLabel}
          color={categoryColors[question.category] ?? 'blush'}
        />
      </div>

      {/* Question text */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-snug mb-2">
        {question.question}
      </h2>

      {/* Hint */}
      {question.hint && (
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{question.hint}</p>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.question}>
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value, option.score)}
              className={[
                'tap-target w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-sm sm:text-base',
                'transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-blush-400 bg-blush-50 text-blush-700 shadow-sm scale-[1.01]'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blush-200 hover:bg-blush-50/50 active:scale-95',
              ].join(' ')}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-blush-500 bg-blush-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </span>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
