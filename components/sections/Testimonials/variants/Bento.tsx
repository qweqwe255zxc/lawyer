import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
 * Заголовок пилюлей по центру, первый отзыв — крупный (рейтинг, большая
 * цитата, автор с фото), остальные — сетка поменьше. Асимметрию из
 * референса (разная высота карточек, водяной знак кавычек) не
 * повторяет — как и в остальных bento (Stats/Steps/Features/Gallery/
 * Team), это отдельная задача на произвольные col-span/row-span (см.
 * нишу «Бизнес — SaaS», docs/section-system.md, раздел 6).
 */
export function Bento(props: TestimonialsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, trust, items, headerAlign, fillLastRow = true } = props;
  // item.featured выбирает, кто получает крупную карточку — без пометки
  // (или без совпадений) крупным остаётся первый по порядку, как раньше.
  const featuredIndex = items.findIndex((item) => item.featured);
  const first = featuredIndex >= 0 ? items[featuredIndex] : items[0];
  const rest = items.filter((_, index) => index !== (featuredIndex >= 0 ? featuredIndex : 0));
  const spanClasses = fillLastRow ? fillLastRowClasses(rest.length, GRID_BREAKPOINTS) : [];

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

        {first ? (
          <div className="mb-6" data-reveal>
            <Card variant="framed">
              <figure>
                <RatingStars rating={first.rating} />
                <TestimonialBody
                  item={first}
                  showPhoto
                  quoteClassName="mt-4 text-quote md:max-w-[42ch]"
                  captionClassName="mt-6"
                />
              </figure>
            </Card>
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, index) => (
            <div
              key={`${item.author}-${index}`}
              data-reveal
              style={revealDelay(index)}
              className={spanClasses[index] || undefined}
            >
              <Card variant="framed" className="flex h-full flex-col">
                <figure className="flex flex-1 flex-col">
                  <RatingStars rating={item.rating} />
                  <TestimonialBody
                    item={item}
                    showPhoto
                    quoteClassName="mt-4 text-small"
                    captionClassName="mt-auto pt-5"
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

export default Bento;
