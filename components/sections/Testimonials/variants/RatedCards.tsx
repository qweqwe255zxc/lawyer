import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { RatingStars } from "../parts/RatingStars";
import { TestimonialBody } from "../parts/TestimonialBody";
import { TestimonialsHeader } from "../parts/TestimonialsHeader";
import { TrustRow } from "../parts/TrustRow";
import type { TestimonialsSection } from "@/types/site";

const GRID_BREAKPOINTS = [
  { prefix: "sm:", cols: 2 },
  { prefix: "lg:", cols: 3 },
] as const;

/**
 * Заголовок пилюлей по центру, простой ряд карточек: рейтинг, цитата,
 * линейка, автор с фото. `item.featured` переводит карточку на
 * ink-поверхность — обычно выделяют один отзыв среди остальных.
 * Опциональная строка `trust` под сеткой.
 */
export function RatedCards(props: TestimonialsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, trust, items, headerAlign, fillLastRow = true } = props;
  const spanClasses = fillLastRow ? fillLastRowClasses(items.length, GRID_BREAKPOINTS) : [];

  return (
    <Section id={id} surface={surface}>
      <Container>
        <TestimonialsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align={headerAlign}
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={`${item.author}-${index}`}
              data-reveal
              style={revealDelay(index)}
              className={spanClasses[index] || undefined}
            >
              {/* Мягкая тонировка вместо полной инверсии поверхности —
                  раньше data-surface="ink" на светлой теме давал сплошной
                  чёрный прямоугольник вместо акцентной карточки. */}
              <Card
                variant="framed"
                className={cn("flex h-full flex-col", item.featured && "bg-fg/[0.06]")}
              >
                <figure className="flex flex-1 flex-col">
                  <RatingStars rating={item.rating} />

                  <TestimonialBody
                    item={item}
                    showPhoto
                    quoteClassName="mt-4 text-lead"
                    captionClassName="mt-auto border-t border-rule pt-5"
                  />
                </figure>
              </Card>
            </div>
          ))}
        </div>

        {trust ? <TrustRow trust={trust} className="mt-12 md:mt-16" /> : null}
      </Container>
    </Section>
  );
}

export default RatedCards;
