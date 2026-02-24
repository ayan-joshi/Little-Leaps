'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import type { ContactFormData } from '@/types';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const initialForm: ContactFormData = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      setState('success');
      setForm(initialForm);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="card-base p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h2>
        <p className="text-gray-500 mb-6">
          Thanks for reaching out. Check your inbox for a confirmation email — we&apos;ll be in touch soon.
        </p>
        <Button variant="outline" onClick={() => setState('idle')}>Send another message</Button>
      </div>
    );
  }

  const inputClass = [
    'w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-700',
    'bg-white placeholder:text-gray-400',
    'focus:outline-none focus:border-blush-400 focus:ring-2 focus:ring-blush-100',
    'transition-colors tap-target',
  ].join(' ');

  return (
    <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 flex flex-col gap-5" noValidate>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your name <span className="text-blush-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email address <span className="text-blush-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Subject <span className="text-blush-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a subject…</option>
          <option>Question about an award</option>
          <option>Milestone quiz feedback</option>
          <option>Order / delivery enquiry</option>
          <option>Partnership opportunity</option>
          <option>General feedback</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message <span className="text-blush-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help…"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === 'error' && (
        <div role="alert" className="text-sm text-blush-600 bg-blush-50 border border-blush-200 rounded-xl px-4 py-3">
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" loading={state === 'submitting'} className="w-full">
        Send Message
      </Button>

      <p className="text-xs text-gray-400 text-center">
        We respect your privacy. Your details are never shared with third parties.
      </p>
    </form>
  );
}
