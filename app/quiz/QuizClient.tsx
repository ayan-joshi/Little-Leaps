'use client';

import { useState, useCallback } from 'react';
import AgeSelector from '@/components/quiz/AgeSelector';
import QuestionCard from '@/components/quiz/QuestionCard';
import ProgressBar from '@/components/quiz/ProgressBar';
import ResultCard from '@/components/quiz/ResultCard';
import Button from '@/components/ui/Button';
import { getQuestionsForAge } from '@/lib/quizLogic';
import type { QuizAnswer, QuizQuestion, QuizResult } from '@/types';

type QuizStep = 'age' | 'questions' | 'email' | 'submitting' | 'result' | 'error';

// ─── Email capture step ────────────────────────────────────────────────────────

function EmailStep({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail]   = useState('');
  const [touched, setTouched] = useState(false);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="card-base p-6 sm:p-8 w-full max-w-xl mx-auto">
      {/* Mail icon — inline SVG, no emoji */}
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-blush-50 flex items-center justify-center">
          <svg className="w-7 h-7 text-blush-500" viewBox="0 0 24 24" fill="none"
               aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor"
                  strokeWidth="1.8"/>
            <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
        Your results are ready!
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email to receive the full development report. No spam — ever.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); if (isValid) onSubmit(email); }}
        className="flex flex-col gap-4"
        noValidate
      >
        <div>
          <label htmlFor="quiz-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email address
          </label>
          <input
            id="quiz-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="your@email.com"
            autoComplete="email"
            aria-describedby={touched && !isValid ? 'email-error' : undefined}
            aria-invalid={touched && !isValid}
            className={[
              'w-full rounded-2xl border-2 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-blush-100 transition-colors tap-target',
              touched && !isValid
                ? 'border-blush-400 bg-blush-50'
                : 'border-gray-200 bg-white focus:border-blush-400',
            ].join(' ')}
          />
          {touched && !isValid && (
            <p id="email-error" role="alert"
               className="text-xs text-blush-500 mt-1.5 ml-1">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <Button type="submit" size="lg" disabled={!isValid} className="w-full">
          Get My Full Report
          <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </form>
    </div>
  );
}

// ─── Submitting screen ────────────────────────────────────────────────────────

function SubmittingScreen({ count }: { count: number }) {
  return (
    <div className="text-center py-20" aria-live="polite" aria-busy="true">
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-lavender-50 flex items-center justify-center
                        animate-pulse-soft">
          <svg className="w-8 h-8 text-lavender-500 animate-spin" viewBox="0 0 24 24"
               fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="3"/>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-700">Calculating your results</p>
      <p className="text-sm text-gray-400 mt-2">Analysing {count} answers&hellip;</p>
    </div>
  );
}

// ─── Error screen ─────────────────────────────────────────────────────────────

function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="card-base p-8 text-center max-w-md mx-auto" role="alert">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-blush-50 flex items-center justify-center">
          <svg className="w-7 h-7 text-blush-500" viewBox="0 0 24 24" fill="none"
               aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M12 7v5M12 16v.5" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6 text-sm">{message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}

// ─── Main quiz orchestrator ───────────────────────────────────────────────────

export default function QuizClient() {
  const [step, setStep]               = useState<QuizStep>('age');
  const [babyAge, setBabyAge]         = useState<number>(0);
  const [email, setEmail]             = useState('');
  const [questions, setQuestions]     = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]         = useState<QuizAnswer[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [result, setResult]           = useState<QuizResult | null>(null);
  const [errorMsg, setErrorMsg]       = useState('');

  // Age selected → filter questions, begin quiz immediately
  const handleAgeSelect = useCallback((age: number) => {
    setBabyAge(age);
    setQuestions(getQuestionsForAge(age));
    setStep('questions');
  }, []);

  // Email captured → call API → show results
  const handleEmailSubmit = useCallback(async (submitted: string) => {
    setEmail(submitted);
    setStep('submitting');
    try {
      const res  = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submitted, babyAge, answers }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStep('error');
        return;
      }
      setResult(data.data.result);
      setStep('result');
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStep('error');
    }
  }, [babyAge, answers]);

  // Option selected for current question
  const handleOptionSelect = useCallback(
    (value: string, score: number) => {
      setSelectedValue(value);
      const question = questions[currentIndex];
      setAnswers((prev) => [
        ...prev.filter((a) => a.questionId !== question.id),
        { questionId: question.id, category: question.category,
          selectedValue: value, score, weight: question.weight },
      ]);
    },
    [questions, currentIndex]
  );

  // Advance to next question (pre-fill if already answered)
  const handleNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) return;
    const nextQ = questions[currentIndex + 1];
    setCurrentIndex((i) => i + 1);
    setSelectedValue(answers.find((a) => a.questionId === nextQ.id)?.selectedValue ?? null);
  }, [currentIndex, questions, answers]);

  // Go back (restore previous answer)
  const handleBack = useCallback(() => {
    if (currentIndex <= 0) return;
    const prevQ = questions[currentIndex - 1];
    setCurrentIndex((i) => i - 1);
    setSelectedValue(answers.find((a) => a.questionId === prevQ.id)?.selectedValue ?? null);
  }, [currentIndex, questions, answers]);

  // All questions answered → advance to email capture
  const handleFinish = useCallback(() => {
    setStep('email');
  }, []);

  // Full reset
  const handleRetake = useCallback(() => {
    setStep('age');
    setBabyAge(0);
    setEmail('');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedValue(null);
    setResult(null);
    setErrorMsg('');
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  if (step === 'age')        return <AgeSelector onSelect={handleAgeSelect} />;
  if (step === 'email')      return <EmailStep onSubmit={handleEmailSubmit} />;
  if (step === 'submitting') return <SubmittingScreen count={answers.length} />;
  if (step === 'error')      return <ErrorScreen message={errorMsg} onRetry={() => setStep('email')} />;
  if (step === 'result' && result) return <ResultCard result={result} babyAge={babyAge} email={email} onRetake={handleRetake} />;

  // ── Questions step ────────────────────────────────────────────────────────
  if (step === 'questions') {
    const question          = questions[currentIndex];
    const isLast            = currentIndex === questions.length - 1;
    const hasAnsweredCurrent = answers.some((a) => a.questionId === question.id);

    return (
      <div className="flex flex-col gap-6 items-center w-full">
        <div className="w-full max-w-xl mx-auto">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        <QuestionCard
          question={question}
          selectedValue={selectedValue}
          onSelect={handleOptionSelect}
        />

        <div className="flex items-center justify-between w-full max-w-xl mx-auto gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="min-w-[80px]"
            aria-label="Previous question"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Button>

          {isLast ? (
            <Button
              size="md"
              onClick={handleFinish}
              disabled={!hasAnsweredCurrent}
              className="flex-1 sm:flex-none sm:min-w-[160px]"
              aria-label="Submit quiz and see results"
            >
              See My Results
              <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          ) : (
            <Button
              size="md"
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className="flex-1 sm:flex-none sm:min-w-[120px]"
              aria-label="Next question"
            >
              Next
              <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Baby age: {babyAge} months &middot; {answers.length} of {questions.length} answered
        </p>
      </div>
    );
  }

  return null;
}
