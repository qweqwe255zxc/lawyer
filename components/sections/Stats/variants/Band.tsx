import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { containerClasses } from "../parts/container";
import { StatItems } from "../parts/StatItems";
import { StatsNumber } from "../parts/StatsNumber";
import type { StatsSection } from "@/types/site";

/**
 * Разделители полосы: 2 колонки на мобильном, 4 на десктопе.
 * Классы собираются статическими литералами — иначе сканер Tailwind
 * их не увидит и утилиты не попадут в сборку.
 *
 * Паддинг симметричный на всех ячейках (без обнуления слева у первой
 * колонки) и текст внутри центрирован — иначе цифры разной длины
 * («18» рядом с «640») висят на левом крае каждой колонки и полоса
 * читается неровной, особенно когда все 4 в одну строку на десктопе.
 */
function bandCell(index: number): string {
  const parts = ["px-4 py-4 text-center sm:px-6 md:px-8 border-rule"];

  if (index % 2 === 1) parts.push("border-l");
  if (index >= 2) parts.push("border-t");

  parts.push("md:border-t-0");
  if (index % 4 === 0) parts.push("md:border-l-0");
  else parts.push("md:border-l");

  return parts.join(" ");
}

/**
 * Плотная полоса с разделителями. Фон тот же, что у hero, но плотность
 * другая: после разреженного hero сразу идёт сжатая полоса с цифрами.
 * Вариант по умолчанию в «Экономе».
 */
export function Band(props: StatsSection) {
  const { id, surface = "paper", containerVariant = "flat", number, items } = props;
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
        <StatsNumber number={number} />

        <dl
          className={cn(
            "grid grid-cols-2 md:grid-cols-4",
            containerClasses(containerVariant),
          )}
        >
          <StatItems items={items} cellClassName={bandCell} />
        </dl>
      </Container>
    </Section>
  );
}

export default Band;
