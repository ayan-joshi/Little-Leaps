# Little Leaps — Baby Awards & Development Tracker

A production-ready Next.js 14 platform that helps parents track their baby's developmental milestones, receive personalised email reports, and celebrate every first with milestone awards.

---

## Features

- **Baby Milestone Quiz** — age-filtered questions (1–24 months), one at a time, with progress tracking
- **Email Report** — detailed development report sent via Resend after quiz completion
- **Development Scoring** — 3-tier result system: On Track / Slight Delay / Needs Attention
- **Awards Catalogue** — browse milestone award products
- **Development Blog** — evidence-based articles by paediatric specialists
- **Contact Form** — submissions stored in Supabase with confirmation email
- **Mobile-first** — fully responsive, accessible, no emojis (inline SVGs throughout)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ayan-joshi/Little-Leaps.git
cd Little-Leaps
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=hello@yourdomain.com

# App
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Create Supabase tables

Run this SQL in your Supabase SQL Editor:

```sql
create extension if not exists "uuid-ossp";

create table public.quiz_submissions (
  id             uuid primary key default uuid_generate_v4(),
  email          text not null,
  baby_age       int  not null check (baby_age between 1 and 24),
  quiz_answers   jsonb not null default '[]',
  result_summary jsonb not null default '{}',
  score          int  not null default 0,
  created_at     timestamptz not null default now()
);

create table public.contact_submissions (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.quiz_submissions    enable row level security;
alter table public.contact_submissions enable row level security;
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── submit-quiz/     # Quiz submission endpoint
│   │   └── contact/         # Contact form endpoint
│   ├── quiz/                # Quiz page + client orchestrator
│   ├── awards/              # Awards catalogue
│   ├── blogs/               # Development blog
│   ├── about/               # About page
│   ├── contact/             # Contact page + form
│   └── layout.tsx           # Root layout
├── components/
│   ├── quiz/                # AgeSelector, QuestionCard, ResultCard, ProgressBar
│   ├── awards/              # AwardCard
│   ├── blogs/               # BlogCard
│   ├── layout/              # Header, Footer
│   └── ui/                  # Button, Badge
├── data/
│   ├── milestoneQuestions.json   # 28 age-filtered quiz questions
│   ├── awards.json               # Award products
│   └── blogs.json                # Blog articles
├── lib/
│   ├── quizLogic.ts         # Scoring engine
│   ├── supabase.ts          # Supabase clients
│   └── resend.ts            # Email templates
├── public/images/           # SVG assets
└── types/index.ts           # TypeScript interfaces
```

---

## Quiz Scoring

Questions are weighted and filtered by the baby's exact age in months (`age_min` / `age_max`).

| Score | Status | Tier |
|---|---|---|
| 70% and above | On Track | `on-track` |
| 45% – 69% | Slight Delay | `slight-delay` |
| Below 45% | Needs Attention | `needs-attention` |

---

## Deployment

### Vercel (recommended)

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Add all environment variables from `.env.local.example`
3. Deploy — every `git push` to `main` auto-deploys

### Environment variables needed on Vercel

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
```

---

## License

MIT
