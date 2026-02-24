import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the Little Leaps team. We're here to help with questions about our awards, milestone quiz, or development resources.",
};

export default function ContactPage() {
  return (
    <div className="section-padding page-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          {/* Mail icon — no emoji */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-mint-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-mint-600" viewBox="0 0 32 32" fill="none"
                   aria-hidden="true">
                <rect x="4" y="8" width="24" height="18" rx="4" stroke="currentColor"
                      strokeWidth="1.8"/>
                <path d="M4 13l12 7 12-7" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Get in Touch</h1>
          <p className="text-gray-500">
            Have a question or feedback? We&apos;d love to hear from you. Our team usually
            responds within 1–2 business days.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
