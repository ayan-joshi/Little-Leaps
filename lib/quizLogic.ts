import questionsData from '@/data/milestoneQuestions.json';
import type {
  QuizQuestion,
  QuizAnswer,
  QuizResult,
  CategoryScore,
  QuizCategory,
  DevelopmentStatus,
} from '@/types';

// ─── Question Filtering ───────────────────────────────────────────────────────

/**
 * Returns all questions applicable to a baby's age in months.
 * Filters using the snake_case age_min / age_max fields (schema v2).
 */
export function getQuestionsForAge(ageMonths: number): QuizQuestion[] {
  return (questionsData.questions as QuizQuestion[]).filter(
    (q) => ageMonths >= q.age_min && ageMonths <= q.age_max
  );
}

// ─── Score Calculation ────────────────────────────────────────────────────────

/**
 * Calculates the full quiz result from an array of user answers.
 *
 * Returns:
 *   totalScore       — weighted sum of earned scores
 *   maxScore         — maximum possible weighted score
 *   percentage       — overall percentage (0–100)
 *   status           — 'On Track' | 'Slight Delay' | 'Needs Attention'
 *   categoryBreakdown — { categoryLabel: percentage } for each category
 *
 * Plus rich UI fields: tier, tierLabel, tierDescription,
 *   categoryScores, highlights, recommendations.
 */
export function calculateQuizResult(answers: QuizAnswer[]): QuizResult {
  if (answers.length === 0) {
    return buildEmptyResult();
  }

  // ── Group by category ────────────────────────────────────────────────────
  const categoryMap = new Map<
    QuizCategory,
    { label: string; raw: number; max: number }
  >();

  for (const answer of answers) {
    const existing = categoryMap.get(answer.category) ?? {
      label: getCategoryLabel(answer.category),
      raw: 0,
      max: 0,
    };
    // Weighted score: earned = option.score × weight, max = 3 × weight
    existing.raw += answer.score * answer.weight;
    existing.max += 3 * answer.weight;
    categoryMap.set(answer.category, existing);
  }

  // ── Per-category scores ──────────────────────────────────────────────────
  const categoryScores: CategoryScore[] = Array.from(categoryMap.entries()).map(
    ([category, data]) => ({
      category,
      categoryLabel: data.label,
      rawScore: parseFloat(data.raw.toFixed(2)),
      maxScore: parseFloat(data.max.toFixed(2)),
      percentage: data.max > 0 ? Math.round((data.raw / data.max) * 100) : 0,
    })
  );

  // ── Totals ───────────────────────────────────────────────────────────────
  const totalRaw = categoryScores.reduce((sum, c) => sum + c.rawScore, 0);
  const totalMax = categoryScores.reduce((sum, c) => sum + c.maxScore, 0);
  const percentage = totalMax > 0 ? Math.round((totalRaw / totalMax) * 100) : 0;

  // ── Tier & status ────────────────────────────────────────────────────────
  const tier = determineTier(percentage);

  // ── Category breakdown map ───────────────────────────────────────────────
  const categoryBreakdown: Record<string, number> = {};
  for (const cs of categoryScores) {
    categoryBreakdown[cs.categoryLabel] = cs.percentage;
  }

  return {
    // Core spec fields
    totalScore: parseFloat(totalRaw.toFixed(2)),
    maxScore: parseFloat(totalMax.toFixed(2)),
    percentage,
    status: tier.status,
    categoryBreakdown,

    // Rich UI fields
    tier: tier.key,
    tierLabel: tier.label,
    tierDescription: tier.description,
    categoryScores,
    highlights: generateHighlights(categoryScores),
    recommendations: generateRecommendations(categoryScores, tier.key),
  };
}

// ─── Tier / Status Logic ──────────────────────────────────────────────────────

type TierKey = QuizResult['tier'];

interface Tier {
  key: TierKey;
  status: DevelopmentStatus;
  label: string;
  description: string;
}

/**
 * Three-tier development status:
 *   >= 70% → On Track
 *   >= 45% → Slight Delay
 *    < 45% → Needs Attention
 */
function determineTier(percentage: number): Tier {
  if (percentage >= 70) {
    return {
      key: 'on-track',
      status: 'On Track',
      label: 'On Track',
      description:
        "Your baby is meeting developmental milestones well. Keep up the wonderful play, conversation, and stimulation — every interaction makes a real difference.",
    };
  }
  if (percentage >= 45) {
    return {
      key: 'slight-delay',
      status: 'Slight Delay',
      label: 'Slight Delay',
      description:
        "Some milestones are still emerging, which is very common at this age. Focused play activities can help, and your health visitor can offer reassurance or guidance.",
    };
  }
  return {
    key: 'needs-attention',
    status: 'Needs Attention',
    label: 'Needs Attention',
    description:
      "Based on your answers, we recommend speaking with your paediatrician or health visitor. Early support can make a significant positive difference — you are doing the right thing by checking.",
  };
}

// ─── Highlights & Recommendations ────────────────────────────────────────────

function generateHighlights(categoryScores: CategoryScore[]): string[] {
  const strong = categoryScores
    .filter((c) => c.percentage >= 70)
    .sort((a, b) => b.percentage - a.percentage);

  if (strong.length === 0) {
    return ['Every interaction with your baby builds their development — keep it up.'];
  }

  return strong
    .slice(0, 3)
    .map((c) => `Strong ${c.categoryLabel} development (${c.percentage}% achieved)`);
}

function generateRecommendations(
  categoryScores: CategoryScore[],
  tier: TierKey
): string[] {
  const tips: Record<QuizCategory, string> = {
    gross_motor:
      'Encourage daily floor time and tummy time to build core strength and motor confidence.',
    fine_motor:
      'Offer safe objects of different textures and sizes to grasp, squeeze, and explore.',
    language:
      'Talk, sing, and read to your baby every day — narrate your actions to build vocabulary.',
    cognitive:
      'Play peek-a-boo, hide-and-seek with toys, and simple sorting games to stimulate thinking.',
    social_emotional:
      'Maintain consistent routines and respond warmly to every cue to build secure attachment.',
  };

  const developing = categoryScores
    .filter((c) => c.percentage < 60)
    .sort((a, b) => a.percentage - b.percentage);

  const recs: string[] = developing.slice(0, 3).map((c) => tips[c.category]);

  if (tier === 'on-track' && recs.length === 0) {
    recs.push(
      'Celebrate this milestone with a Little Leaps certificate — you have both earned it!',
      'Introduce simple puzzles and stacking toys to keep challenging your baby.',
      'Playdates and group activities can further support social development.'
    );
  }

  if (recs.length < 2) {
    recs.push(
      'Read picture books together to build language and bonding.',
      'Regular outdoor exploration stimulates all areas of development.'
    );
  }

  return recs.slice(0, 3);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCategoryLabel(category: QuizCategory): string {
  const labels: Record<QuizCategory, string> = {
    gross_motor: 'Gross Motor',
    fine_motor: 'Fine Motor',
    language: 'Language',
    cognitive: 'Cognitive',
    social_emotional: 'Social & Emotional',
  };
  return labels[category] ?? category;
}

function buildEmptyResult(): QuizResult {
  return {
    totalScore: 0,
    maxScore: 0,
    percentage: 0,
    status: 'On Track',
    categoryBreakdown: {},
    tier: 'on-track',
    tierLabel: 'On Track',
    tierDescription: 'No answers recorded.',
    categoryScores: [],
    highlights: [],
    recommendations: [],
  };
}
