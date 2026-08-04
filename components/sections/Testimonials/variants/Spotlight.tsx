import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { RatingStars } from "../parts/RatingStars";
import { TestimonialBody } from "../parts/TestimonialBody";
import { TestimonialsHeader } from "../parts/TestimonialsHeader";
import { TrustRow } from "../parts/TrustRow";
import type { TestimonialsSection } from "@/types/site";

/**
 * Заголовок слева, один крупный отзыв (рейтинг, большая цитата,
 * `result`, автор с фото) в карточке слева, список остальных отзывов
 * справа — без карточек, на линейках (та же идея, что у `Quotes`, но
 * компактнее и с рейтингом).
 */
export function Spotlight(props: TestimonialsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, trust, items, headerAlign } = props;
  // item.featured выбирает, чей отзыв становится крупной колонкой слева —
  // без пометки (или без совпадений) им остаётся первый по порядку.
  const featuredIndex = items.findIndex((item) => item.featured);
  const first = featuredIndex >= 0 ? items[featuredIndex] : items[0];
  const rest = items.filter((_, index) => index !== (featuredIndex >= 0 ? featuredIndex : 0));
  const ResultIcon = getIcon("shieldCheck");

  return (
    <Section id={id} surface={surface}>
      <Container>
        <TestimonialsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align={headerAlign ?? "left"}
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-2">
          {first ? (
            <div data-reveal className="h-full">
              <Card variant="framed" className="h-full">
                {/* flex-col + order: рейтинг и цитата сверху (естественный
                    порядок), автор — order-3 + mt-auto, чтобы прижаться к
                    низу и занять пустоту, если список справа выше карточки. */}
                <figure className="flex h-full flex-col">
                  <RatingStars rating={first.rating} />
                  <TestimonialBody
                    item={first}
                    showPhoto
                    quoteClassName="order-1 mt-4 text-quote"
                    captionClassName="order-3 mt-auto pt-5"
                  />

                  {first.result ? (
                    <p className="order-2 mt-5 flex items-center gap-2 border-t border-rule pt-5 text-small font-medium text-accent">
                      {ResultIcon ? (
                        <ResultIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
                      ) : null}
                      {first.result}
                    </p>
                  ) : null}
                </figure>
              </Card>
            </div>
          ) : null}

          <ul>
            {rest.map((item, index) => (
              <li
                key={`${item.author}-${index}`}
                data-reveal
                style={revealDelay(index)}
                className="border-b border-rule py-6 first:pt-0 last:border-b-0"
              >
                <figure>
                  <RatingStars rating={item.rating} />
                  <TestimonialBody
                    item={item}
                    showPhoto
                    quoteClassName="mt-3 text-small"
                    captionClassName="mt-4"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {trust ? <TrustRow trust={trust} className="mt-12 md:mt-16" /> : null}
      </Container>
    </Section>
  );
}

export default Spotlight;
