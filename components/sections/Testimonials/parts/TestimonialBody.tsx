import { cn } from "@/lib/cn";
import type { TestimonialItem } from "@/types/site";

interface TestimonialBodyProps {
  item: TestimonialItem;
  /**
   * Классы цитаты и подписи задаёт вариант: в quotes они сидят в сетке.
   *
   * СЮДА ЖЕ вариант обязан передать ступень кегля цитаты (`text-quote` /
   * `text-lead`) — базового размера тут нет намеренно. Причина
   * практическая: две утилиты font-size в одном className конфликтуют не
   * по порядку в строке, а по порядку в собранном CSS, поэтому
   * «база + переопределение из варианта» давало бы непредсказуемый
   * результат. Кегль выбирает тот, кто знает ширину колонки: 28px хороши
   * в широкой колонке quotes и разваливаются в узкой карточке на 1/3
   * ширины, где та же цитата занимает десять строк.
   */
  quoteClassName?: string;
  captionClassName?: string;
}

/**
 * Цитата и подпись автора. Общие для обеих раскладок — отличается только
 * то, где они стоят: в 12-колоночной сетке (quotes) или друг под другом
 * в карточке (cards).
 */
export function TestimonialBody({
  item,
  quoteClassName,
  captionClassName,
}: TestimonialBodyProps) {
  return (
    <>
      <blockquote className={cn("measure font-display", quoteClassName)}>
        {item.quote}
      </blockquote>

      <figcaption
        className={cn(
          "text-caption font-medium uppercase text-fg-muted",
          captionClassName,
        )}
      >
        {item.author}
        {item.meta ? (
          <span className="mt-1.5 block normal-case tracking-normal">
            {item.meta}
          </span>
        ) : null}
      </figcaption>
    </>
  );
}

export default TestimonialBody;
