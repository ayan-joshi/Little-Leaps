// ─── Award Types ──────────────────────────────────────────────────────────────

export interface Award {
  id: string;
  slug: string;
  title: string;
  category: string;
  ageRange: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  description: string;
  features: string[];
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

// ─── Blog Types ───────────────────────────────────────────────────────────────

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  readingTime: number;
  image: string;
  featured: boolean;
}

// ─── Quiz Types ───────────────────────────────────────────────────────────────

export type QuizCategory =
  | 'gross_motor'
  | 'fine_motor'
  | 'language'
  | 'cognitive'
  | 'social_emotional';

export interface QuizOption {
  value: string;
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  /** Snake-case age range fields (schema v2) */
  age_min: number;
  age_max: number;
  category: QuizCategory;
  categoryLabel: string;
  question: string;
  hint: string;
  options: QuizOption[];
  weight: number;
}

export interface QuizAnswer {
  questionId: string;
  category: QuizCategory;
  selectedValue: string;
  score: number;
  weight: number;
}

export interface CategoryScore {
  category: QuizCategory;
  categoryLabel: string;
  rawScore: number;
  maxScore: number;
  percentage: number;
}

/** Human-readable development status returned by the quiz */
export type DevelopmentStatus = 'On Track' | 'Slight Delay' | 'Needs Attention';

export interface QuizResult {
  // ── Core scoring fields (as per spec) ──────────────────────────────────────
  totalScore: number;
  maxScore: number;
  percentage: number;
  status: DevelopmentStatus;
  /** category label → percentage score, e.g. { "Gross Motor": 80 } */
  categoryBreakdown: Record<string, number>;

  // ── Rich UI fields ─────────────────────────────────────────────────────────
  tier: 'on-track' | 'slight-delay' | 'needs-attention';
  tierLabel: string;
  tierDescription: string;
  categoryScores: CategoryScore[];
  highlights: string[];
  recommendations: string[];
}

export interface QuizSubmissionPayload {
  email: string;
  babyAge: number;
  answers: QuizAnswer[];
  result: QuizResult;
}

export interface QuizSubmissionRow {
  id?: string;
  email: string;
  baby_age: number;
  quiz_answers: QuizAnswer[];
  result_summary: QuizResult;
  score: number;
  created_at?: string;
}

// ─── Contact Types ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionRow {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiSuccess<T = null> {
  success: true;
  data?: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T = null> = ApiSuccess<T> | ApiError;

// ─── Product Awards Types ─────────────────────────────────────────────────────

export interface ProductAwardWinner {
  name: string;
  brand: string;
  image: string;
  description: string;
}

export interface ProductAwardCategory {
  gold: ProductAwardWinner;
  silver: ProductAwardWinner;
}

// Record<year, Record<categoryName, ProductAwardCategory>>
export type ProductAwardsData = Record<string, Record<string, ProductAwardCategory>>;
