import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { StatCard } from "../parts/StatCard";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

/**
 * Заголовок пилюлей + крупный заголовок + лид по центру, затем карточки
 * с круглой плашкой под иконкой (`Card variant="framed"` — глубину
 * выбирает тариф). Требует `icon` у каждого item, иначе плашка пустая.
 */
export function Badge(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, iconShape } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <StatsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-12 md:mb-16"
        />

        <dl className="grid gap-x-gutter gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Card
              key={item.label}
              variant="framed"
              data-reveal
              style={revealDelay(index)}
            >
              <StatCard item={item} tile="round" />
            </Card>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export default Badge;
