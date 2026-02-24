import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Public client — safe to use in browser and Server Components.
 * Uses the anon key; subject to Row Level Security policies.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Admin client — server-side only (API routes / Server Actions).
 * Bypasses RLS. NEVER expose in client-side code.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// ─── Supabase SQL Schema (run once in your Supabase SQL editor) ───────────────
//
// create extension if not exists "uuid-ossp";
//
// create table public.quiz_submissions (
//   id            uuid primary key default uuid_generate_v4(),
//   email         text not null,
//   baby_age      int  not null check (baby_age between 1 and 24),
//   quiz_answers  jsonb not null default '[]',
//   result_summary jsonb not null default '{}',
//   score         int  not null default 0,
//   created_at    timestamptz not null default now()
// );
//
// create table public.contact_submissions (
//   id         uuid primary key default uuid_generate_v4(),
//   name       text not null,
//   email      text not null,
//   subject    text not null,
//   message    text not null,
//   created_at timestamptz not null default now()
// );
//
// -- Enable RLS (admin key bypasses it from the server)
// alter table public.quiz_submissions    enable row level security;
// alter table public.contact_submissions enable row level security;
