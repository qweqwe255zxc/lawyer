import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { containerClasses } from "../parts/container";
import { StatItems } from "../parts/StatItems";
import { StatsNumber } from "../parts/StatsNumber";
import type { StatsSection } from "@/types/site";

/**
 * Свободная сетка без разделителей: цифры стоят пятнами, а не полосой.
 * Вариант по умолчанию в «Стандарте» — вместе с containerVariant="elevated"
 * это метрики продукта в поднятом блоке, а не строгий бухгалтерский ряд.
 */
export function Grid(props: StatsSection) {
  const { id, surface = "paper", containerVariant = "flat", number, eyebrow, title, items } = props;
  const isFlat = containerVariant === "flat";

  return (
    <Section
      id={id}
      surface={surface}
      spacing="sm"
      ruleTop={isFlat}
      className={isFlat ? "border-b border-rule" : undefined}
    >
      <Container>
        <StatsNumber number={number} eyebrow={eyebrow} title={title} />

        <dl
          className={cn(
            "grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4",
            containerClasses(containerVariant),
          )}
        >
          <StatItems items={items} cellClassName={() => "text-center"} align="center" />
        </dl>
      </Container>
    </Section>
  );
}

export default Grid;
