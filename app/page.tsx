import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Little Leaps | Baby Milestone Awards & Development Tracker',
  description:
    'Little Leaps helps parents celebrate every baby milestone with personalised awards, expert development guides, and a free age-tailored milestone quiz.',
};

// ─── Feature icons (inline SVG — no emoji) ───────────────────────────────────

function AwardIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#fff0f3"/>
      <path d="M14 29h12M20 29v-5" stroke="#f93d6f" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 12h12v9a6 6 0 01-12 0v-9z" stroke="#f93d6f" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 16H11a2 2 0 000 4h3M26 16h3a2 2 0 010 4h-3"
            stroke="#f93d6f" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#f5f3ff"/>
      <rect x="12" y="11" width="16" height="18" rx="3" stroke="#8b5cf6" strokeWidth="1.8"/>
      <path d="M16 17h8M16 21h6M16 25h4" stroke="#8b5cf6" strokeWidth="1.8"
            strokeLinecap="round"/>
      <rect x="17" y="8" width="6" height="4" rx="2" fill="#ede9fe" stroke="#8b5cf6"
            strokeWidth="1.5"/>
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#eff9ff"/>
      <path d="M13 12h14M13 16h14M13 20h10M13 24h8" stroke="#06a7eb" strokeWidth="1.8"
            strokeLinecap="round"/>
      <circle cx="28" cy="26" r="5" fill="#e0f2fe" stroke="#06a7eb" strokeWidth="1.5"/>
      <path d="M26 26l1.3 1.3L30 24" stroke="#06a7eb" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#f0fdf5"/>
      <rect x="10" y="14" width="20" height="14" rx="3" stroke="#22c55e" strokeWidth="1.8"/>
      <path d="M10 18l10 6 10-6" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

const features = [
  { Icon: AwardIcon, title: 'Milestone Awards',    desc: 'Beautiful personalised certificates and trophies for every developmental first.' },
  { Icon: QuizIcon,  title: 'Free Milestone Quiz', desc: 'Expert-designed quiz tailored to your baby\'s exact age — instant, detailed results.' },
  { Icon: BlogIcon,  title: 'Expert Blog',         desc: 'Evidence-based articles from paediatricians and child development specialists.' },
  { Icon: MailIcon,  title: 'Email Your Results',  desc: 'Receive a detailed development report straight to your inbox after the quiz.' },
];

const testimonials = [
  { name: 'Amara K.',  text: 'The quiz was so reassuring. It showed exactly what areas our little one is excelling in and gave me brilliant tips for the rest!', role: 'Mum of an 8-month-old' },
  { name: 'Tom R.',    text: 'We framed the First Steps Trophy certificate. My wife cried. I definitely did not. Highly recommend!', role: 'Dad of a 13-month-old' },
  { name: 'Priya S.', text: 'Such a well-designed platform. Everything feels warm and celebratory — exactly how parenting should feel.', role: 'Mum of twins' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding page-padding bg-gradient-to-b from-blush-50 via-lavender-50 to-transparent">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-5">
              Every First Deserves{' '}
              <span className="gradient-text">to be Celebrated</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              From first smiles to first steps — Little Leaps helps parents celebrate their
              baby&apos;s incredible journey with personalised awards, expert guidance, and a
              free development quiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz">
                <Button size="lg">Take the Free Milestone Quiz</Button>
              </Link>
              <Link href="/awards">
                <Button size="lg" variant="outline">Browse Awards</Button>
              </Link>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <Image
              src="/images/hero-illustration.svg"
              alt="Baby milestone journey — a path showing development stages from 1 to 24 months"
              width={600}
              height={380}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding page-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3">
            Everything Your Growing Baby Needs
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
            One platform to track milestones, celebrate achievements, and get expert support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ Icon, title, desc }) => (
              <div key={title}
                   className="card-base p-6 text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <Icon />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA banner */}
      <section className="page-padding py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blush-400 to-lavender-400
                        rounded-3xl p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8
                        items-center text-white">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Is Your Baby Hitting Their Milestones?
            </h2>
            <p className="text-white/85 mb-6 text-sm sm:text-base">
              Select your baby&apos;s age and answer a few questions — under 3 minutes and
              you&apos;ll get a detailed development report by email.
            </p>
            <Link href="/quiz">
              <button className="bg-white text-blush-600 font-bold px-8 py-4 rounded-full
                                 text-sm sm:text-base hover:bg-blush-50 transition-colors
                                 tap-target focus:outline-none focus-visible:ring-2
                                 focus-visible:ring-white focus-visible:ring-offset-2
                                 focus-visible:ring-offset-blush-400">
                Start Free Quiz
              </button>
            </Link>
          </div>
          <div className="hidden sm:block">
            <Image
              src="/images/quiz-illustration.svg"
              alt="Quiz checklist illustration"
              width={320}
              height={240}
              className="w-full h-auto max-w-xs mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding page-padding bg-gradient-to-b from-transparent to-lavender-50/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            Loved by Parents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="card-base p-6">
                {/* Quote icon */}
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
    </>
  );
}
