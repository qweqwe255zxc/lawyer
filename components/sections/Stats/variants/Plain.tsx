import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatCard } from "../parts/StatCard";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

/**
 * Самый спокойный из карточных вариантов: заголовок по центру без пилюли,
 * иконка без плашки (tile="none") — просто акцентный штрих над числом.
 */
export function Plain(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StatsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          eyebrowStyle="plain"
          className="mb-10 md:mb-14"
        />

        <dl className="grid gap-x-gutter gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Card key={item.label} variant="framed">
              <StatCard item={item} index={index} tile="none" />
            </Card>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export default Plain;
