import type { Metadata } from 'next';
import QuizClient from './QuizClient';

export const metadata: Metadata = {
  title: 'Free Baby Milestone Quiz',
  description:
    "Take the free Little Leaps baby milestone quiz. Select your baby's age (1–24 months), answer a few questions, and get a personalised development report — from the team behind the Little Leaps Baby Awards.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com'}/quiz` },
};

export default function QuizPage() {
  // No section-padding here — each quiz step manages its own vertical spacing.
  // The questions step needs to fill the full viewport height without any outer padding pushing it down.
  return (
    <div className="page-padding">
      <QuizClient />
    </div>
  );
}
