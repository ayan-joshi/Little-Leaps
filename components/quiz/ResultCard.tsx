'use client';

import type { QuizResult } from '@/types';
import Button from '@/components/ui/Button';
import { useState } from 'react';


// ─── Share card canvas generator ─────────────────────────────────────────────

function generateShareCanvas(result: QuizResult, babyAge: number): HTMLCanvasElement {
  const W = 480, H = 580;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const colors = {
    'on-track':        { header: '#16a34a', accent: '#22c55e', light: '#dcfce7', badge: '#14532d' },
    'slight-delay':    { header: '#ea580c', accent: '#fb923c', light: '#ffedd5', badge: '#7c2d12' },
    'needs-attention': { header: '#be123c', accent: '#f43f5e', light: '#ffe4e6', badge: '#881337' },
  };
  const c = colors[result.tier];

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Coloured header panel
  ctx.fillStyle = c.header;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, 210, [0, 0, 32, 32]);
  ctx.fill();

  // Brand
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Little Leaps', W / 2, 42);

  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.font = '13px system-ui, -apple-system, sans-serif';
  ctx.fillText('Baby Milestone Report', W / 2, 64);

  // Score circle — outer ring
  const cx = W / 2, cy = 148, r = 56;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fill();

  // Score circle — white fill
  ctx.beginPath();
  ctx.arc(cx, cy, r - 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Score number
  ctx.fillStyle = c.header;
  ctx.font = 'bold 34px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${result.percentage}%`, cx, cy + 11);
  ctx.fillStyle = '#9ca3af';
  ctx.font = '11px system-ui, -apple-system, sans-serif';
  ctx.fillText('overall', cx, cy + 28);

  // Status badge
  const bw = 170, bh = 34, bx = (W - bw) / 2, by = 228;
  ctx.fillStyle = c.light;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 17);
  ctx.fill();

  ctx.fillStyle = c.badge;
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.status, W / 2, by + 22);

  // Baby age
  ctx.fillStyle = '#374151';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Baby age: ${babyAge} month${babyAge === 1 ? '' : 's'}`, W / 2, 294);

  // Tier description — word-wrapped
  ctx.fillStyle = '#6b7280';
  ctx.font = '13px system-ui, -apple-system, sans-serif';
  const words = result.tierDescription.split(' ');
  const maxLineW = W - 80;
  let line = '';
  let lineY = 326;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxLineW && line) {
      ctx.fillText(line, W / 2, lineY);
      line = word;
      lineY += 22;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, W / 2, lineY);

  // Divider
  ctx.strokeStyle = '#f3f4f6';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 430);
  ctx.lineTo(W - 40, 430);
  ctx.stroke();

  // Footer CTA
  ctx.fillStyle = '#9ca3af';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillText('Take the free quiz at', W / 2, 462);
  ctx.fillStyle = c.accent;
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('littleleaps.com/quiz', W / 2, 484);

  return canvas;
}

// ─── Share handler ────────────────────────────────────────────────────────────

async function shareResult(result: QuizResult, babyAge: number) {
  const canvas = generateShareCanvas(result, babyAge);
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), 'image/png'),
  );
  const file = new File([blob], 'little-leaps-report.png', { type: 'image/png' });

  if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
    // Image only — the canvas already contains the branding and URL
    await navigator.share({ files: [file], title: "My Baby's Milestone Report" });
  } else {
    // Fallback: download the image (no text-only share — image is the message)
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'little-leaps-report.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

interface ResultCardProps {
  result: QuizResult;
  babyAge: number;
  email: string;
  emailSent: boolean;
  onRetake: () => void;
  onGetFullReport: () => void;
}

const tierStyles: Record<
  QuizResult['tier'],
  { bg: string; text: string; ring: string; barColor: string }
> = {
  'on-track':        { bg: 'from-mint-50 to-sky-50',       text: 'text-mint-700',     ring: 'ring-mint-300',     barColor: '#22c55e' },
  'slight-delay':    { bg: 'from-peach-50 to-cream-50',    text: 'text-peach-700',    ring: 'ring-peach-300',    barColor: '#fb923c' },
  'needs-attention': { bg: 'from-blush-50 to-lavender-50', text: 'text-blush-700',    ring: 'ring-blush-300',    barColor: '#f93d6f' },
};

const statusIcons: Record<QuizResult['tier'], React.ReactNode> = {
  'on-track': (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#dcfce7"/>
      <path d="M14 24l7 7 13-14" stroke="#22c55e" strokeWidth="3.5"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'slight-delay': (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#ffedd5"/>
      <path d="M24 14v12M24 32v2" stroke="#fb923c" strokeWidth="3.5"
            strokeLinecap="round"/>
    </svg>
  ),
  'needs-attention': (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#ffe0e9"/>
      <path d="M24 14v12M24 32v2" stroke="#f93d6f" strokeWidth="3.5"
            strokeLinecap="round"/>
    </svg>
  ),
};

type ShareState = 'idle' | 'sharing' | 'done' | 'error';

export default function ResultCard({ result, babyAge, email, emailSent, onRetake, onGetFullReport }: ResultCardProps) {
  const style = tierStyles[result.tier];
  const [shareState, setShareState] = useState<ShareState>('idle');

  const handleShare = async () => {
    setShareState('sharing');
    try {
      await shareResult(result, babyAge);
      setShareState('done');
      setTimeout(() => setShareState('idle'), 2500);
    } catch {
      // User cancelled share or error — reset silently
      setShareState('idle');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-5">

      {/* Status header */}
      <div className={`card-base p-6 sm:p-8 bg-gradient-to-br ${style.bg} text-center`}>
        <div className="flex justify-center mb-4">
          {statusIcons[result.tier]}
        </div>

        {/* Status badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border-2
                         bg-white/70 mb-3 ${style.ring.replace('ring-', 'border-')}`}>
          <span className={`text-base font-bold ${style.text}`}>{result.status}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto mb-5">
          {result.tierDescription}
        </p>

        {/* Score ring */}
        <div className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-full
                         ring-4 ${style.ring} bg-white mx-auto`}
             role="img" aria-label={`Overall score: ${result.percentage}%`}>
          <span className={`text-3xl font-extrabold ${style.text}`}>
            {result.percentage}%
          </span>
          <span className="text-xs text-gray-400">overall</span>
        </div>

        {/* Email confirmation — only shown after email submitted */}
        {emailSent && email && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-gray-100">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" viewBox="0 0 16 16" fill="none"
                 aria-hidden="true">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <p className="text-xs text-gray-500">
              Full report sent to <strong className="font-semibold text-gray-700">{email}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Category breakdown */}
      {result.categoryScores.length > 0 && (
        <div className="card-base p-5 sm:p-6 relative">
          <div className={!emailSent ? 'blur-sm pointer-events-none select-none' : undefined}>
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
              Category Breakdown
            </h3>
            <div className="flex flex-col gap-4" aria-hidden={!emailSent}>
              {result.categoryScores.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-1.5 text-sm">
                    <span className="font-medium text-gray-700">{cat.categoryLabel}</span>
                    <span className="font-bold text-gray-800 tabular-nums">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${cat.percentage}%`, background: 'linear-gradient(to right, #f93d6f, #8b5cf6)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!emailSent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-2xl gap-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <button
                onClick={onGetFullReport}
                className="text-sm font-semibold text-blush-500 underline underline-offset-2 hover:text-blush-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 rounded"
              >
                Get Full Report
              </button>
            </div>
          )}
        </div>
      )}

      {/* Strengths */}
      {result.highlights.length > 0 && (
        <div className="card-base p-5 sm:p-6 relative">
          <div className={!emailSent ? 'blur-sm pointer-events-none select-none' : undefined}>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <svg className="w-4 h-4 text-mint-500 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.7l-3.7 1.9.7-4.1-3-2.9 4.1-.7z"/>
              </svg>
              Strengths
            </h3>
            <ul className="flex flex-col gap-2" aria-hidden={!emailSent}>
              {result.highlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-mint-500 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="#dcfce7"/>
                    <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          {!emailSent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-2xl gap-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <button
                onClick={onGetFullReport}
                className="text-sm font-semibold text-blush-500 underline underline-offset-2 hover:text-blush-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 rounded"
              >
                Get Full Report
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips for Growth */}
      {result.recommendations.length > 0 && (
        <div className="card-base p-5 sm:p-6 relative">
          <div className={!emailSent ? 'blur-sm pointer-events-none select-none' : undefined}>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <svg className="w-4 h-4 text-lavender-500 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#8b5cf6" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 11v.5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Tips for Growth
            </h3>
            <ul className="flex flex-col gap-2" aria-hidden={!emailSent}>
              {result.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-lavender-400 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {!emailSent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-2xl gap-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <button
                onClick={onGetFullReport}
                className="text-sm font-semibold text-blush-500 underline underline-offset-2 hover:text-blush-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 rounded"
              >
                Get Full Report
              </button>
            </div>
          )}
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleShare}
          disabled={shareState === 'sharing'}
          aria-label="Share your baby's milestone report"
        >
          {shareState === 'sharing' ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Sharing…
            </>
          ) : shareState === 'done' ? (
            <>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" fill="#22c55e"/>
                <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Shared!
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="4"  cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 9l4.5 3M10.5 4L6 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Share Report
            </>
          )}
        </Button>
        <Button size="lg" variant="outline" onClick={onRetake} className="flex-1">
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}
