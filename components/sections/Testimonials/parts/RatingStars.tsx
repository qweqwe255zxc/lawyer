import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";

const MAX_RATING = 5;

interface RatingStarsProps {
  rating?: number;
  className?: string;
}

/**
 * Пять звёзд, из которых закрашены `rating`. Тот же приём, что у
 * Hero/parts/HeroOverlay.tsx: графика aria-hidden, текстовая оценка —
 * для экранного диктора (пять одинаковых иконок он бы прочитал пять раз
 * подряд, ничего не сообщив).
 */
export function RatingStars({ rating, className }: RatingStarsProps) {
  const Star = getIcon("star");
  if (typeof rating !== "number" || !Star) return null;

  const value = Math.min(MAX_RATING, Math.max(0, Math.round(rating)));

  return (
    <p className={cn("flex items-center gap-1", className)}>
      <span className="sr-only">
        Оценка: {value} из {MAX_RATING}
      </span>
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            "size-4",
            index < value ? "fill-current text-accent" : "text-rule-strong",
          )}
        />
      ))}
    </p>
  );
}

export default RatingStars;
