import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { StatCard } from "../parts/StatCard";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

const GRID_BREAKPOINTS = [
  { prefix: "sm:", cols: 2 },
  { prefix: "lg:", cols: 4 },
] as const;

/**
 * Самый спокойный из карточных вариантов: заголовок по центру без пилюли,
 * иконка без плашки (tile="none") — просто акцентный штрих над числом.
 */
export function Plain(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, fillLastRow = true } = props;
  const spanClasses = fillLastRow ? fillLastRowClasses(items.length, GRID_BREAKPOINTS) : [];

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
            <Card
              key={item.label}
              variant="framed"
              data-reveal
              style={revealDelay(index)}
              className={spanClasses[index] || undefined}
            >
              <StatCard item={item} tile="none" />
            </Card>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export default Plain;
