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
  const { id, surface = "paper", number, eyebrow, title, lead, trust, items } = props;
  const [first, ...rest] = items;
  const ResultIcon = getIcon("shieldCheck");

  return (
    <Section id={id} surface={surface}>
      <Container>
        <TestimonialsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align="left"
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-2">
          {first ? (
            <div data-reveal>
              <Card variant="framed" className="h-full">
                <RatingStars rating={first.rating} />
                <TestimonialBody
                  item={first}
                  showPhoto
                  quoteClassName="mt-4 text-quote"
                  captionClassName="mt-6"
                />

                {first.result ? (
                  <p className="mt-5 flex items-center gap-2 border-t border-rule pt-5 text-small font-medium text-accent">
                    {ResultIcon ? (
                      <ResultIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
                    ) : null}
                    {first.result}
                  </p>
                ) : null}
              </Card>
            </div>
          ) : null}

          <ul>
            {rest.map((item, index) => (
              <li
                key={item.author}
                data-reveal
                style={revealDelay(index)}
                className="border-b border-rule py-6 first:pt-0 last:border-b-0"
              >
                <RatingStars rating={item.rating} />
                <TestimonialBody
                  item={item}
                  showPhoto
                  quoteClassName="mt-3 text-small"
                  captionClassName="mt-4"
                />
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
