import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendContactConfirmationEmail } from '@/lib/resend';
import type { ContactFormData, ApiResponse, ContactSubmissionRow } from '@/types';

export async function POST(request: NextRequest) {
  let body: ContactFormData;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body;

  // ─── Validation ────────────────────────────────────────────────────────────

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Name must be at least 2 characters.' },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'A valid email address is required.' },
      { status: 400 }
    );
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Subject is required.' },
      { status: 400 }
    );
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Message must be at least 10 characters.' },
      { status: 400 }
    );
  }

  // ─── Persist to Supabase ───────────────────────────────────────────────────

  const row: ContactSubmissionRow = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  const { error: dbError } = await supabaseAdmin
    .from('contact_submissions')
    .insert(row);

  if (dbError) {
    console.error('[contact] Supabase insert error:', dbError);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to save your message. Please try again.' },
      { status: 500 }
    );
  }

  // ─── Confirmation email (non-fatal) ────────────────────────────────────────

  try {
    await sendContactConfirmationEmail({ to: email, name });
  } catch (emailError) {
    console.error('[contact] Email send error:', emailError);
  }

  return NextResponse.json<ApiResponse>(
    { success: true, message: 'Message received! We will be in touch soon.' },
    { status: 200 }
  );
}
