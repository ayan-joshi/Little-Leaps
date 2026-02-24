interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="font-semibold text-gray-600">
          Question {current} of {total}
        </span>
        <span className="font-bold text-blush-500">{percentage}%</span>
      </div>
      <div
        className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Quiz progress: ${percentage}%`}
      >
        <div
          className="h-full bg-gradient-to-r from-blush-400 to-lavender-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
