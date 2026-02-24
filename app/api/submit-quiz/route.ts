import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { calculateQuizResult } from '@/lib/quizLogic';
import { sendQuizResultEmail } from '@/lib/resend';
import type { QuizSubmissionPayload, ApiResponse, QuizSubmissionRow } from '@/types';

export async function POST(request: NextRequest) {
  let body: QuizSubmissionPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const { email, babyAge, answers } = body;

  // ─── Input validation ──────────────────────────────────────────────────────

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'A valid email address is required.' },
      { status: 400 }
    );
  }

  if (!babyAge || typeof babyAge !== 'number' || babyAge < 1 || babyAge > 24) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Baby age must be between 1 and 24 months.' },
      { status: 400 }
    );
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Quiz answers are required.' },
      { status: 400 }
    );
  }

  // ─── Score calculation (always runs — no external dependencies) ───────────

  const result = calculateQuizResult(answers);

  // ─── Persist to Supabase (non-fatal — never blocks the user) ──────────────
  // If Supabase is not configured or the insert fails, we log and continue.
  // The user will still receive their results and email report.

  try {
    const row: QuizSubmissionRow = {
      email:          email.toLowerCase().trim(),
      baby_age:       babyAge,
      quiz_answers:   answers,
      result_summary: result,
      score:          result.percentage,
    };

    const { error: dbError } = await supabaseAdmin
      .from('quiz_submissions')
      .insert(row);

    if (dbError) {
      console.error('[submit-quiz] Supabase insert error:', dbError.message);
    }
  } catch (dbException) {
    console.error('[submit-quiz] Supabase exception:', dbException);
    // Continue — do not return an error to the user
  }

  // ─── Send email report (non-fatal — always attempted) ─────────────────────
  // The email is the primary deliverable. Failure is logged but never
  // surfaces as a user-facing error so the result screen always shows.

  try {
    await sendQuizResultEmail({
      to:      email.toLowerCase().trim(),
      babyAge,
      result,
    });
  } catch (emailError) {
    console.error('[submit-quiz] Email send error:', emailError);
  }

  // ─── Always return the result to the client ────────────────────────────────

  return NextResponse.json<ApiResponse<{ result: typeof result }>>(
    {
      success: true,
      data:    { result },
      message: 'Quiz submitted successfully!',
    },
    { status: 200 }
  );
}
