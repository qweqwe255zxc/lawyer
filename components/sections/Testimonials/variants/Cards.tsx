import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { TestimonialBody } from "../parts/TestimonialBody";
import type { TestimonialsSection } from "@/types/site";

/**
 * Три отзыва в ряд, каждый в Card variant="framed" — то есть с глубиной
 * своего тарифа. Вариант по умолчанию в «Стандарте».
 *
 * Исторически этот вариант менял только число колонок и рисовал те же
 * линейки, что и quotes: «карточки» без карточек, из-за чего секция
 * оставалась плоской в любом тарифе. Теперь это настоящие карточки.
 */
export function Cards(props: TestimonialsSection) {
  const {
    id,
    surface = "paper",
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

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
            "grid gap-gutter md:grid-cols-3",
          )}
        >
          {items.map((item, index) => (
            <Card key={item.author} variant="framed" className="h-full">
              <figure data-reveal style={revealDelay(index)}>
                <TestimonialBody item={item} captionClassName="mt-6" />
              </figure>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Cards;
