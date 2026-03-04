import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: { absolute: 'Little Leaps | Baby Product Awards & Development Guides' },
  description:
    'Little Leaps Baby Awards — expert-tested Gold & Silver winners for the best baby products across every developmental category. Plus a free milestone quiz and evidence-based guides.',
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com' },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Little Leaps',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com',
  description:
    'Expert-tested baby product awards, free milestone quiz, and development guides for parents.',
};

// ─── Category pills for hero ──────────────────────────────────────────────────

const awardCategories = [
  'Gross Motor',
  'Sensory & Fine Motor',
  'Language & Cognitive',
  'Social & Emotional',
  'Sleep & Comfort',
  'Feeding & Nutrition',
  'Safety & Daily Care',
  'Skincare & Hygiene',
];

// ─── Services (quiz is one of these) ─────────────────────────────────────────

function QuizIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="4" width="20" height="24" rx="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M11 12h10M11 17h7M11 22h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 8h22M5 14h22M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="25" cy="24" r="5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M23 24l1.3 1.5L27 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const services = [
  {
    Icon: QuizIcon,
    color: 'text-lavender-500 bg-lavender-50',
    title: 'Free Milestone Quiz',
    desc: 'Answer a few age-tailored questions and get an instant development report for your baby — no signup required.',
    href: '/quiz',
    cta: 'Take the Quiz',
  },
  {
    Icon: BlogIcon,
    color: 'text-sky-500 bg-sky-50',
    title: 'Expert Blog',
    desc: 'Evidence-based articles from paediatricians and child development specialists on every stage of your baby\'s growth.',
    href: '/blogs',
    cta: 'Read Articles',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  { name: 'Priya S.', text: 'The awards page saved us hours of research. We ended up buying the gold winner for sensory development and our daughter loves it.', role: 'Mum of a 6-month-old' },
  { name: 'Tom R.',   text: 'The evaluation criteria are actually transparent — I could see exactly why each product won. That\'s rare for a baby product site.', role: 'Dad of a 9-month-old' },
  { name: 'Amara K.', text: 'The milestone quiz was so reassuring. It showed exactly what areas our little one is excelling in and gave brilliant tips for the rest!', role: 'Mum of an 8-month-old' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-padding page-padding bg-gradient-to-b from-amber-50 via-blush-50/40 to-transparent">
        <div className="max-w-2xl mx-auto">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700
                          rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide mb-5">
            <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 16 16" fill="currentColor"
                 aria-hidden="true">
              <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
            </svg>
            2026 Baby Product Awards
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800
                         leading-tight break-words mb-4">
            The Best Baby Products,{' '}
            <span className="gradient-text">Expert-Tested &amp; Ranked</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            Little Leaps tests hundreds of baby products every year and awards Gold &amp;
            Silver to the very best — organised by developmental category so you always
            know exactly what your baby needs and why.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {awardCategories.map((cat) => (
              <span key={cat}
                    className="text-xs font-semibold px-3 py-1 rounded-full
                               bg-white border border-gray-200 text-gray-600 shadow-sm">
                {cat}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/awards" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 16 16" fill="currentColor"
                     aria-hidden="true">
                  <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
                </svg>
                See 2026 Award Winners
              </Button>
            </Link>
            <Link href="/quiz" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">Free Milestone Quiz</Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ── How It Works (awards) ──────────────────────────────────────────── */}
      <section className="section-padding page-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              How the Awards Work
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Every winner earns their award through a rigorous four-part process — not paid
              placements or brand partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'We Shortlist', desc: 'Our team identifies every relevant product launched or updated in the last 12 months across all 8 developmental categories.' },
              { step: '02', title: 'We Test', desc: 'Products are tested by parents with babies in the target age range — 4 to 6 weeks of real daily use, not lab conditions.' },
              { step: '03', title: 'We Score', desc: 'Each product is scored on safety, developmental impact, longevity, and real-world value using a transparent four-part framework.' },
              { step: '04', title: 'We Award', desc: 'The top scorer in each category earns Gold. The runner-up earns Silver. No ties, no paid placements — only merit.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card-base p-6">
                <span className="text-3xl font-extrabold text-blush-100 leading-none">{step}</span>
                <h3 className="font-bold text-gray-800 mt-2 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/awards">
              <Button size="lg">
                Browse All Award Winners
                <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Other Services ─────────────────────────────────────────────────── */}
      <section className="section-padding page-padding bg-gray-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Also on Little Leaps</h2>
            <p className="text-gray-500 text-sm">Free tools and resources for every stage of your baby&apos;s first two years.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map(({ Icon, color, title, desc, href, cta }) => (
              <div key={title} className="card-base p-6 flex gap-5 items-start">
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                  <Icon />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1.5">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                  <Link href={href}
                        className="inline-flex items-center gap-1 text-sm font-semibold
                                   text-lavender-600 hover:text-lavender-700 transition-colors">
                    {cta}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="section-padding page-padding">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            Loved by Parents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="card-base p-6">
                <svg className="w-7 h-7 text-blush-200 mb-3" viewBox="0 0 28 28" fill="currentColor"
                     aria-hidden="true">
                  <path d="M4 14c0-4.4 3.6-8 8-8v3a5 5 0 00-5 5v1h5v8H4v-9zm14 0c0-4.4 3.6-8 8-8v3a5 5 0 00-5 5v1h5v8H18v-9z"/>
                </svg>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.text}</p>
                <footer>
                  <cite className="not-italic">
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom awards CTA ──────────────────────────────────────────────── */}
      <section className="page-padding py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-400 to-yellow-300
                        rounded-3xl p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8
                        items-center text-white">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Find the Right Product for Your Baby
            </h2>
            <p className="text-white/85 mb-6 text-sm sm:text-base">
              Stop searching review sites. Our award winners are tested and ranked by
              developmental category — so you can shop by what your baby actually needs right now.
            </p>
            <Link href="/awards">
              <button className="bg-white text-amber-600 font-bold px-8 py-4 rounded-full
                                 text-sm sm:text-base hover:bg-amber-50 transition-colors
                                 tap-target focus:outline-none focus-visible:ring-2
                                 focus-visible:ring-white focus-visible:ring-offset-2
                                 focus-visible:ring-offset-amber-400">
                See the 2026 Winners &rarr;
              </button>
            </Link>
          </div>
          <div className="hidden sm:flex items-center justify-center">
            <svg viewBox="0 0 160 140" fill="none" className="w-44 h-auto" aria-hidden="true">
              <path d="M52 36h56v36a28 28 0 01-56 0V36z"
                    fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5"
                    strokeLinejoin="round"/>
              <path d="M52 48H38a12 12 0 000 24h14"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M108 48h14a12 12 0 010 24h-14"
                    stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M80 100v16" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
              <rect x="60" y="116" width="40" height="8" rx="4"
                    fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
              <path d="M80 50l3.1 9.5H93l-8 5.8 3 9.5-8-5.8-8 5.8 3-9.5-8-5.8h9.9z"
                    fill="rgba(255,255,255,0.55)"/>
              <circle cx="34" cy="36" r="3" fill="rgba(255,255,255,0.4)"/>
              <circle cx="128" cy="44" r="2" fill="rgba(255,255,255,0.4)"/>
              <circle cx="140" cy="28" r="3.5" fill="rgba(255,255,255,0.3)"/>
              <circle cx="22" cy="60" r="2.5" fill="rgba(255,255,255,0.3)"/>
              <path d="M120 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="rgba(255,255,255,0.45)"/>
              <path d="M26 26l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z"
                    fill="rgba(255,255,255,0.35)"/>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
