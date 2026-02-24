import type { Metadata } from 'next';
import QuizClient from './QuizClient';

export const metadata: Metadata = {
  title: 'Baby Milestone Quiz',
  description:
    'Take our free, expert-designed baby milestone quiz. Select your baby\'s age (1–24 months) and receive personalised development insights by email.',
};

export default function QuizPage() {
  return (
    <div className="section-padding page-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          {/* Clipboard icon — no emoji */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-lavender-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-lavender-500" viewBox="0 0 32 32" fill="none"
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Baby Milestone Quiz
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Answer a few quick questions about your baby&apos;s current skills. We&apos;ll generate
            a personalised development report — completely free.
          </p>
        </div>
        <QuizClient />
      </div>
    </div>
  );
}
