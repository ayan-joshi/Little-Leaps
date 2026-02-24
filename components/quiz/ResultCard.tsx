'use client';

import type { QuizResult } from '@/types';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface ResultCardProps {
  result: QuizResult;
  babyAge: number;
  email: string;
  onRetake: () => void;
}

const tierStyles: Record<
  QuizResult['tier'],
  { bg: string; text: string; ring: string; barColor: string }
> = {
  'on-track':        { bg: 'from-mint-50 to-sky-50',       text: 'text-mint-700',     ring: 'ring-mint-300',     barColor: '#22c55e' },
  'slight-delay':    { bg: 'from-peach-50 to-cream-50',    text: 'text-peach-700',    ring: 'ring-peach-300',    barColor: '#fb923c' },
  'needs-attention': { bg: 'from-blush-50 to-lavender-50', text: 'text-blush-700',    ring: 'ring-blush-300',    barColor: '#f93d6f' },
};

const statusIcons: Record<QuizResult['tier'], React.ReactNode> = {
  'on-track': (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#dcfce7"/>
      <path d="M14 24l7 7 13-14" stroke="#22c55e" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'slight-delay': (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#ffedd5"/>
      <path d="M24 14v12M24 32v2" stroke="#fb923c" strokeWidth="3.5"
            strokeLinecap="round"/>
    </svg>
  ),
  'needs-attention': (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#ffe0e9"/>
      <path d="M24 14v12M24 32v2" stroke="#f93d6f" strokeWidth="3.5"
            strokeLinecap="round"/>
    </svg>
  ),
};

export default function ResultCard({ result, babyAge, email, onRetake }: ResultCardProps) {
  const style = tierStyles[result.tier];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-5">

      {/* Status header */}
      <div className={`card-base p-6 sm:p-8 bg-gradient-to-br ${style.bg} text-center`}>
        <div className="flex justify-center mb-4">
          {statusIcons[result.tier]}
        </div>

        {/* Status badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border-2
                         bg-white/70 mb-3 ${style.ring.replace('ring-', 'border-')}`}>
          <span className={`text-base font-bold ${style.text}`}>{result.status}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto mb-5">
          {result.tierDescription}
        </p>

        {/* Score ring */}
        <div className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-full
                         ring-4 ${style.ring} bg-white mx-auto`}
             role="img" aria-label={`Overall score: ${result.percentage}%`}>
          <span className={`text-3xl font-extrabold ${style.text}`}>
            {result.percentage}%
          </span>
          <span className="text-xs text-gray-400">overall</span>
        </div>

        {/* Email confirmation */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-gray-100">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" viewBox="0 0 16 16" fill="none"
               aria-hidden="true">
            <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <p className="text-xs text-gray-500">
            Full report sent to <strong className="font-semibold text-gray-700">{email}</strong>
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      {result.categoryScores.length > 0 && (
        <div className="card-base p-5 sm:p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
            Category Breakdown
          </h3>
          <div className="flex flex-col gap-4" role="list" aria-label="Development category scores">
            {result.categoryScores.map((cat) => (
              <div key={cat.category} role="listitem">
                <div className="flex justify-between items-center mb-1.5 text-sm">
                  <span className="font-medium text-gray-700">{cat.categoryLabel}</span>
                  <span className="font-bold text-gray-800 tabular-nums">
                    {cat.percentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden"
                     role="progressbar"
                     aria-valuenow={cat.percentage}
                     aria-valuemin={0}
                     aria-valuemax={100}
                     aria-label={`${cat.categoryLabel}: ${cat.percentage}%`}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${cat.percentage}%`,
                      background: `linear-gradient(to right, #f93d6f, #8b5cf6)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {result.highlights.length > 0 && (
        <div className="card-base p-5 sm:p-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <svg className="w-4 h-4 text-mint-500 shrink-0" viewBox="0 0 16 16" fill="currentColor"
                 aria-hidden="true">
              <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
            </svg>
            Strengths
          </h3>
          <ul className="flex flex-col gap-2" aria-label="Baby's developmental strengths">
            {result.highlights.map((h, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-mint-500 mt-0.5 shrink-0" viewBox="0 0 16 16"
                     fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" fill="#dcfce7"/>
                  <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="card-base p-5 sm:p-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <svg className="w-4 h-4 text-lavender-500 shrink-0" viewBox="0 0 16 16" fill="none"
                 aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="#8b5cf6" strokeWidth="1.5"/>
              <path d="M8 5v3.5M8 11v.5" stroke="#8b5cf6" strokeWidth="1.5"
                    strokeLinecap="round"/>
            </svg>
            Tips for Growth
          </h3>
          <ul className="flex flex-col gap-2" aria-label="Development tips">
            {result.recommendations.map((r, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-lavender-400 mt-0.5 shrink-0" viewBox="0 0 16 16"
                     fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#a78bfa" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/awards" className="flex-1">
          <Button size="lg" className="w-full">Browse Milestone Awards</Button>
        </Link>
        <Button size="lg" variant="outline" onClick={onRetake} className="flex-1">
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}
