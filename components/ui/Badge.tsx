interface BadgeProps {
  label: string;
  color?: 'blush' | 'mint' | 'sky' | 'lavender' | 'peach' | 'cream';
}

const colorClasses: Record<NonNullable<BadgeProps['color']>, string> = {
  blush:    'bg-blush-100 text-blush-600',
  mint:     'bg-mint-100 text-mint-700',
  sky:      'bg-sky-100 text-sky-700',
  lavender: 'bg-lavender-100 text-lavender-700',
  peach:    'bg-peach-100 text-peach-700',
  cream:    'bg-cream-100 text-yellow-700',
};

export default function Badge({ label, color = 'blush' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${colorClasses[color]}`}
    >
      {label}
    </span>
  );
}
