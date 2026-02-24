import { Resend } from 'resend';
import type { QuizResult } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM   = process.env.RESEND_FROM_EMAIL   ?? 'hello@littleleaps.com';
const SITE   = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://littleleaps.com';

// ─── Tier styling helpers ─────────────────────────────────────────────────────

const TIER_COLOR: Record<QuizResult['tier'], string> = {
  'on-track':        '#16a34a',
  'slight-delay':    '#ea580c',
  'needs-attention': '#dc2626',
};

const TIER_BG: Record<QuizResult['tier'], string> = {
  'on-track':        '#f0fdf4',
  'slight-delay':    '#fff7ed',
  'needs-attention': '#fef2f2',
};

const TIER_ICON: Record<QuizResult['tier'], string> = {
  'on-track':        '&#10003;',   // ✓  check mark
  'slight-delay':    '&#33;',      // !  exclamation
  'needs-attention': '&#9888;',    // ⚠  warning
};

// ─── Quiz result email ────────────────────────────────────────────────────────

export async function sendQuizResultEmail(params: {
  to:       string;
  babyAge:  number;
  result:   QuizResult;
}): Promise<void> {
  const { to, babyAge, result } = params;

  const color  = TIER_COLOR[result.tier];
  const bgTint = TIER_BG[result.tier];
  const icon   = TIER_ICON[result.tier];

  // Category breakdown rows
  const categoryRows = result.categoryScores
    .map(
      (c) => `
        <tr>
          <td style="padding:10px 16px; border-bottom:1px solid #f3f4f6;
                     font-size:14px; color:#374151;">
            ${c.categoryLabel}
          </td>
          <td style="padding:10px 16px; border-bottom:1px solid #f3f4f6;
                     text-align:right; font-weight:700; font-size:14px; color:${color};">
            ${c.percentage}%
          </td>
        </tr>`
    )
    .join('');

  // Highlight items (no emoji — use a bullet symbol)
  const highlightItems = result.highlights
    .map(
      (h) => `
        <li style="margin-bottom:8px; padding-left:4px;">
          <span style="color:${color}; font-weight:700;">&#10003;</span>&nbsp;${h}
        </li>`
    )
    .join('');

  // Recommendation items
  const recommendationItems = result.recommendations
    .map(
      (r) => `
        <li style="margin-bottom:8px; padding-left:4px;">
          <span style="color:#8b5cf6; font-weight:700;">&rsaquo;</span>&nbsp;${r}
        </li>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Baby's Milestone Results &ndash; Little Leaps</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;
             font-family:'Helvetica Neue',Arial,sans-serif;color:#111827;">

  <table width="100%" cellpadding="0" cellspacing="0"
         style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">

      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#ffffff;
                    border-radius:16px;overflow:hidden;
                    box-shadow:0 4px 32px rgba(0,0,0,0.08);">

        <!-- ── Header ──────────────────────────────────────── -->
        <tr>
          <td style="background:linear-gradient(135deg,#ffc2d4 0%,#c4b5fd 100%);
                     padding:40px 32px;text-align:center;">
            <!-- Text logo mark — no emoji, no image -->
            <div style="display:inline-block;background:rgba(255,255,255,0.25);
                        border-radius:50px;padding:8px 20px;margin-bottom:16px;">
              <span style="font-size:18px;font-weight:900;color:#fff;
                           letter-spacing:-0.5px;">Little Leaps</span>
            </div>
            <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;
                       line-height:1.3;">
              Your Baby&rsquo;s Milestone Report
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">
              ${babyAge}-month-old development assessment
            </p>
          </td>
        </tr>

        <!-- ── Status badge ────────────────────────────────── -->
        <tr>
          <td style="padding:32px 32px 0;text-align:center;">
            <div style="display:inline-block;background:${bgTint};
                        border:2px solid ${color};border-radius:9999px;
                        padding:12px 32px;">
              <span style="color:${color};font-weight:800;font-size:18px;">
                ${icon}&nbsp;&nbsp;${result.status}
              </span>
            </div>
            <p style="margin:16px 0 0;color:#6b7280;font-size:15px;
                      line-height:1.7;max-width:480px;margin-left:auto;
                      margin-right:auto;">
              ${result.tierDescription}
            </p>
          </td>
        </tr>

        <!-- ── Overall score ───────────────────────────────── -->
        <tr>
          <td style="padding:24px 32px;">
            <div style="background:#f9fafb;border-radius:12px;
                        padding:28px;text-align:center;">
              <div style="font-size:56px;font-weight:900;color:${color};
                          line-height:1;letter-spacing:-2px;">
                ${result.percentage}%
              </div>
              <div style="color:#6b7280;font-size:13px;margin-top:6px;
                          text-transform:uppercase;letter-spacing:0.5px;">
                Overall Milestone Score
              </div>
              <div style="margin-top:16px;background:#e5e7eb;border-radius:99px;
                          height:8px;overflow:hidden;">
                <div style="height:8px;width:${result.percentage}%;
                            background:linear-gradient(to right,#f93d6f,#8b5cf6);
                            border-radius:99px;">
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!-- ── Category breakdown ──────────────────────────── -->
        ${categoryRows ? `
        <tr>
          <td style="padding:0 32px 28px;">
            <h2 style="font-size:16px;font-weight:700;color:#111827;
                       margin:0 0 12px;text-transform:uppercase;
                       letter-spacing:0.5px;font-size:12px;">
              Development by Category
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e5e7eb;border-radius:10px;
                          overflow:hidden;">
              <thead>
                <tr style="background:#f9fafb;">
                  <th style="padding:10px 16px;text-align:left;font-size:12px;
                             color:#6b7280;font-weight:600;
                             text-transform:uppercase;letter-spacing:0.4px;">
                    Category
                  </th>
                  <th style="padding:10px 16px;text-align:right;font-size:12px;
                             color:#6b7280;font-weight:600;
                             text-transform:uppercase;letter-spacing:0.4px;">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>${categoryRows}</tbody>
            </table>
          </td>
        </tr>` : ''}

        <!-- ── Strengths ───────────────────────────────────── -->
        ${highlightItems ? `
        <tr>
          <td style="padding:0 32px 28px;">
            <h2 style="font-size:12px;font-weight:700;color:#111827;
                       margin:0 0 12px;text-transform:uppercase;
                       letter-spacing:0.5px;">
              Your Baby&rsquo;s Strengths
            </h2>
            <div style="background:#f0fdf4;border-radius:10px;padding:16px 20px;">
              <ul style="margin:0;padding-left:16px;color:#374151;
                         font-size:14px;line-height:1.8;">
                ${highlightItems}
              </ul>
            </div>
          </td>
        </tr>` : ''}

        <!-- ── Tips for growth ─────────────────────────────── -->
        ${recommendationItems ? `
        <tr>
          <td style="padding:0 32px 28px;">
            <h2 style="font-size:12px;font-weight:700;color:#111827;
                       margin:0 0 12px;text-transform:uppercase;
                       letter-spacing:0.5px;">
              Tips for Growth
            </h2>
            <div style="background:#f5f3ff;border-radius:10px;padding:16px 20px;">
              <ul style="margin:0;padding-left:16px;color:#374151;
                         font-size:14px;line-height:1.8;">
                ${recommendationItems}
              </ul>
            </div>
          </td>
        </tr>` : ''}

        <!-- ── Divider ─────────────────────────────────────── -->
        <tr>
          <td style="padding:0 32px;">
            <hr style="border:none;border-top:1px solid #f3f4f6;margin:0;" />
          </td>
        </tr>

        <!-- ── CTA ────────────────────────────────────────── -->
        <tr>
          <td style="padding:28px 32px 40px;text-align:center;">
            <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">
              Celebrate this milestone with a personalised award.
            </p>
            <a href="${SITE}/awards"
               style="display:inline-block;
                      background:linear-gradient(135deg,#f93d6f,#8b5cf6);
                      color:#fff;text-decoration:none;padding:14px 36px;
                      border-radius:9999px;font-weight:700;font-size:15px;
                      letter-spacing:-0.2px;">
              Browse Milestone Awards
            </a>
          </td>
        </tr>

        <!-- ── Footer ─────────────────────────────────────── -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;text-align:center;
                     border-top:1px solid #f3f4f6;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              &copy; ${new Date().getFullYear()} Little Leaps &ndash;
              <a href="${SITE}" style="color:#a78bfa;text-decoration:none;">
                ${SITE}
              </a>
            </p>
            <p style="margin:6px 0 0;color:#d1d5db;font-size:11px;">
              You received this because you completed the Little Leaps milestone quiz.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;

  await resend.emails.send({
    from:    FROM,
    to,
    subject: `Your baby's milestone report: ${result.status} (${babyAge} months) — Little Leaps`,
    html,
  });
}

// ─── Contact confirmation email ───────────────────────────────────────────────

export async function sendContactConfirmationEmail(params: {
  to:   string;
  name: string;
}): Promise<void> {
  const { to, name } = params;

  await resend.emails.send({
    from:    FROM,
    to,
    subject: 'We received your message — Little Leaps',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Message received &ndash; Little Leaps</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;
             font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"
         style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0"
             style="max-width:520px;width:100%;background:#fff;
                    border-radius:16px;overflow:hidden;
                    box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <tr>
          <td style="background:linear-gradient(135deg,#ffc2d4,#c4b5fd);
                     padding:32px;text-align:center;">
            <span style="font-size:18px;font-weight:900;color:#fff;">
              Little Leaps
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:22px;
                       color:#111827;">Hi ${name},</h1>
            <p style="margin:0 0 16px;color:#6b7280;font-size:15px;
                      line-height:1.7;">
              Thank you for reaching out to Little Leaps. We have received your
              message and will get back to you within 1&ndash;2 business days.
            </p>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;
                      line-height:1.7;">
              In the meantime, why not take our
              <a href="${SITE}/quiz" style="color:#8b5cf6;font-weight:600;">
                free Baby Milestone Quiz
              </a>?
            </p>
            <a href="${SITE}/quiz"
               style="display:inline-block;
                      background:linear-gradient(135deg,#f93d6f,#8b5cf6);
                      color:#fff;text-decoration:none;padding:12px 28px;
                      border-radius:9999px;font-weight:700;font-size:14px;">
              Take the Free Quiz
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;text-align:center;
                     border-top:1px solid #f3f4f6;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              &copy; ${new Date().getFullYear()} Little Leaps
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}
