import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Little Leaps — our mission to help parents celebrate every precious developmental milestone with joy and expert guidance.',
};

// ─── Inline SVG icons replacing emoji ────────────────────────────────────────

function EvidenceIcon() {
  return (
    <svg className="w-7 h-7 text-lavender-500 shrink-0" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M14 8v6.5l3.5 3.5" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg className="w-7 h-7 text-blush-500 shrink-0" viewBox="0 0 28 28" fill="none">
      <path d="M14 23S4 17 4 10a5 5 0 0110 0 5 5 0 0110 0c0 7-10 13-10 13z"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg className="w-7 h-7 text-sky-600 shrink-0" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M2 14h24M14 2a18 18 0 010 24M14 2a18 18 0 000 24"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg className="w-7 h-7 text-mint-600 shrink-0" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="13" width="16" height="12" rx="3" stroke="currentColor"
            strokeWidth="1.6"/>
      <path d="M9 13V9a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round"/>
      <circle cx="14" cy="19" r="2" fill="currentColor"/>
    </svg>
  );
}

const team = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Paediatric Advisor',
    initials: 'SM',
    bg: 'bg-blush-100 text-blush-600',
    bio: 'With 15 years in paediatric medicine, Sarah ensures all our developmental content is evidence-based and reassuring.',
  },
  {
    name: 'Emma Clarke',
    role: 'Head of Content',
    initials: 'EC',
    bg: 'bg-sky-100 text-sky-600',
    bio: 'A paediatric physiotherapist turned writer, Emma brings practical expertise to every article and quiz question.',
  },
  {
    name: 'James Okafor',
    role: 'Design Lead',
    initials: 'JO',
    bg: 'bg-lavender-100 text-lavender-600',
    bio: 'James creates the warm, accessible designs that make celebrating milestones feel as joyful as they should be.',
  },
];

const values = [
  { Icon: EvidenceIcon, title: 'Evidence-Based',    desc: 'Every piece of content is reviewed by paediatric specialists and grounded in developmental research.' },
  { Icon: HeartIcon,    title: 'Parent-First',      desc: "We build for tired, loving, wondering parents — not for perfection. Every baby is different and that's wonderful." },
  { Icon: GlobeIcon,    title: 'Inclusive',         desc: 'Babies come from everywhere. Our platform and content are designed to feel welcoming to all families.' },
  { Icon: LockIcon,     title: 'Privacy-Respectful',desc: "Your family's data is precious. We use it only to improve your experience and never sell it." },
];

export default function AboutPage() {
  return (
    <div className="section-padding page-padding">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-blush-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-blush-500" viewBox="0 0 32 32" fill="none"
                   aria-hidden="true">
                <path d="M16 28S4 21 4 12a7 7 0 0112 0 7 7 0 0112 0c0 9-12 16-12 16z"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                      strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            About Little Leaps
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We started Little Leaps because we believed one simple thing: every baby&apos;s first
            smile, first word, and first step deserves to be celebrated properly — with a real
            keepsake, expert context, and a community of parents cheering alongside you.
          </p>
        </div>

        {/* Mission */}
        <div className="card-base p-8 mb-12 bg-gradient-to-br from-blush-50 to-lavender-50
                        text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
            To make developmental milestone tracking feel joyful, accessible, and celebratory —
            empowering parents to understand their baby&apos;s growth and cherish every incredible first.
          </p>
        </div>

        {/* Values */}
        <section className="mb-14" aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="card-base p-6 flex gap-4">
                <div className="mt-0.5">
                  <Icon />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading">
          <h2 id="team-heading" className="text-2xl font-bold text-gray-800 mb-6 text-center">
            The Team Behind It
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {team.map((member) => (
              <div key={member.name} className="card-base p-6 text-center">
                {/* Avatar initials */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center
                                 text-xl font-bold mx-auto mb-4 ${member.bg}`}
                     aria-hidden="true">
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-800">{member.name}</h3>
                <p className="text-xs font-semibold text-blush-500 mb-3 uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
