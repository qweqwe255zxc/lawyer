import { cn } from "@/lib/cn";
import type { TestimonialItem } from "@/types/site";

interface TestimonialBodyProps {
  item: TestimonialItem;
  /** Классы цитаты и подписи задаёт вариант: в quotes они сидят в сетке. */
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
      <blockquote
        className={cn("measure font-display text-quote", quoteClassName)}
      >
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
