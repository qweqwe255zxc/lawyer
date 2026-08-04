import { Card } from "@/components/ui/Card";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { HeroOverlay as HeroOverlayData } from "@/types/site";

const MAX_RATING = 5;

/**
 * Отзыв поверх фото в первом экране.
 *
 * Позиционируется абсолютом внутри бокса фото ТОЛЬКО на md+: на узком
 * экране карточка накрыла бы человека на снимке целиком, поэтому там она
 * встаёт обычным блоком под фото. Это не «мобильная версия дизайна», а
 * то же содержимое в раскладке, где для наложения нет места.
 *
 * Звёзды — графика (aria-hidden), а рядом лежит текстовая оценка для
 * экранного диктора: пять одинаковых иконок он бы прочитал пять раз
 * подряд, ничего не сообщив.
 */
export function HeroOverlay({ overlay }: { overlay: HeroOverlayData }) {
  const Star = getIcon("star");
  const rating =
    typeof overlay.rating === "number"
      ? Math.min(MAX_RATING, Math.max(0, Math.round(overlay.rating)))
      : null;

  return (
    <div className="mt-6 md:absolute md:inset-x-6 md:bottom-6 md:mt-0">
      <Card variant="elevated">
        {rating !== null && Star ? (
          <p className="flex items-center gap-1">
            <span className="sr-only">
              Оценка: {rating} из {MAX_RATING}
            </span>
            {/* Закрашенная звезда — fill-current, а не только цвет обводки:
                иконки lucide рисуются штрихом, и без заливки «5 из 5»
                выглядит ровно как «0 из 5» — контуры и там, и там. */}
            {Array.from({ length: MAX_RATING }, (_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn(
                  "size-4",
                  index < rating
                    ? "fill-current text-accent"
                    : "text-rule-strong",
                )}
              />
            ))}
          </p>
        ) : null}

        <blockquote className={cn("text-small", rating !== null && "mt-4")}>
          {overlay.quote}
        </blockquote>

        <p className="mt-4 text-caption font-medium uppercase text-fg-muted">
          {overlay.author}
          {overlay.role ? (
            <span className="mt-1 block normal-case tracking-normal">
              {overlay.role}
            </span>
          ) : null}
        </p>
      </Card>
    </div>
  );
}

export default HeroOverlay;
