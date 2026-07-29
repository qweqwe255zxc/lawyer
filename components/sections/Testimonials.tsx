import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { TestimonialsSection } from "@/types/site";

/**
 * quotes — крупные серифные цитаты по одной в ряд, разделённые линейками:
 * без кавычек-картинок, без аватарок, без карточек (база, тариф «Эконом»).
 *
 * cards — три отзыва в ряд, каждый в Card variant="framed", то есть с
 * глубиной своего тарифа. Раньше этот вариант менял только число колонок
 * и рисовал те же линейки — «карточки» без карточек: в «Стандарте» секция
 * оставалась плоской, чем бы её ни настраивали. Теперь это настоящие
 * карточки, и вариант оправдывает своё имя.
 */
export function Testimonials(props: TestimonialsSection) {
  const {
    id,
    surface = "paper",
    variant = "quotes",
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  const isQuotes = variant === "quotes";

  return (
    <Section id={id} surface={surface} spacing={title ? "default" : "none"}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div
          className={cn(
            title ? "mt-14 md:mt-20" : "pb-section",
            isQuotes ? "" : "grid gap-gutter md:grid-cols-3",
          )}
        >
          {items.map((item, index) => {
            const body = (
              <>
                <blockquote
                  className={cn(
                    "measure font-display text-quote",
                    isQuotes && "md:col-span-8 md:col-start-4",
                  )}
                >
                  {item.quote}
                </blockquote>

                <figcaption
                  className={cn(
                    "text-caption font-medium uppercase text-fg-muted",
                    isQuotes
                      ? "md:col-span-3 md:col-start-1 md:row-start-1"
                      : "mt-6",
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

            return isQuotes ? (
              <figure
                key={item.author}
                data-reveal
                style={revealDelay(index)}
                className="grid gap-x-gutter gap-y-5 border-t border-rule py-8 pt-8 md:grid-cols-12"
              >
                {body}
              </figure>
            ) : (
              <Card key={item.author} variant="framed" className="h-full">
                <figure data-reveal style={revealDelay(index)}>
                  {body}
                </figure>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default Testimonials;
