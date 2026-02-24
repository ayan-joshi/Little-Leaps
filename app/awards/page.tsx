import type { Metadata } from 'next';
import awardsData from '@/data/awards.json';
import type { Award } from '@/types';
import AwardCard from '@/components/awards/AwardCard';

export const metadata: Metadata = {
  title: 'Milestone Awards',
  description:
    'Shop beautiful baby milestone awards, personalised certificates, medals, and trophies for every developmental first — from first smile to first steps.',
};

const awards = awardsData as Award[];

export default function AwardsPage() {
  return (
    <div className="section-padding page-padding">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-blush-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-blush-500" viewBox="0 0 32 32" fill="none"
                   aria-hidden="true">
                <path d="M10 28h12M16 28v-6" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round"/>
                <path d="M10 8h12v8a6 6 0 01-12 0V8z" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 12H7a2 2 0 000 4h3M22 12h3a2 2 0 010 4h-3"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Baby Milestone Awards
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Celebrate every precious first with a personalised award your family will
            treasure forever.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
          <p>
            <span className="font-bold text-gray-700">{awards.length}</span> awards
          </p>
          <p className="text-xs bg-mint-50 text-mint-700 font-semibold px-3 py-1 rounded-full">
            Free UK delivery on orders over £40
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-lavender-50 to-blush-50
                        rounded-3xl p-8">
          <p className="text-gray-700 font-semibold mb-2">Not sure which award to get?</p>
          <p className="text-gray-500 text-sm mb-5">
            Take our free milestone quiz and we&apos;ll recommend the perfect award for your
            baby&apos;s current stage.
          </p>
          <a href="/quiz"
             className="inline-block bg-gradient-to-r from-blush-500 to-lavender-500 text-white
                        font-bold px-6 py-3 rounded-full text-sm hover:from-blush-600
                        hover:to-lavender-600 transition-all focus:outline-none
                        focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2">
            Take the Milestone Quiz
          </a>
        </div>
      </div>
    </div>
  );
}
