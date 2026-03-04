'use client';

import type { QuizQuestion } from '@/types';
import Badge from '@/components/ui/Badge';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedValue: string | null;
  onSelect: (value: string, score: number) => void;
}

const categoryColors: Record<string, 'blush' | 'mint' | 'sky' | 'lavender' | 'peach'> = {
  gross_motor:      'mint',
  fine_motor:       'sky',
  language:         'lavender',
  cognitive:        'peach',
  social_emotional: 'blush',
};

export default function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <div className="card-base p-4 sm:p-6 w-full animate-[fadeIn_0.2s_ease-in]">

      {/* Category badge */}
      <div className="mb-3">
        <Badge
          label={question.categoryLabel}
          color={categoryColors[question.category] ?? 'blush'}
        />
      </div>

      {/* Question text — base on mobile, slightly larger on sm+ */}
      <h2 className="text-base sm:text-lg font-bold text-gray-800 leading-snug mb-1.5">
        {question.question}
      </h2>

      {/* Hint — compact, less bottom margin */}
      {question.hint && (
        <p className="text-xs sm:text-sm text-gray-500 mb-4 leading-relaxed">
          {question.hint}
        </p>
      )}

      {/* Options — tighter padding on mobile for height efficiency */}
      <div className="flex flex-col gap-2" role="radiogroup" aria-label={question.question}>
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value, option.score)}
              className={[
                'w-full text-left px-4 py-3 rounded-2xl border-2 font-semibold text-sm',
                'transition-all duration-150 focus:outline-none',
                'focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
                isSelected
                  ? 'border-blush-400 bg-blush-50 text-blush-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blush-200 hover:bg-blush-50/50',
              ].join(' ')}
            >
              <span className="flex items-center gap-3">
                {/* Radio dot */}
                <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center
                                  justify-center transition-colors ${
                  isSelected ? 'border-blush-500 bg-blush-500' : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"/>
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
