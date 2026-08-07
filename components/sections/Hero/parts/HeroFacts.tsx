import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import type { HeroFact } from "@/types/site";

/**
 * Раскладка рассчитана на 3 колонки (sm:grid-cols-3). Деление на строки
 * идёт по остатку от columns, не по позиции в массиве: при 4+ фактах вторая
 * строка сетки повторяет то же правило, что и первая — левый край строки
 * без sm:border-l, сама строка (кроме самой первой) со своим sm:border-t,
 * которого нет у ячеек первой строки (её сверху отделяет рамка `<dl>`).
 * На мобильном (одна колонка) строк без границы не нужно — линию задаёт
 * каждая ячейка, кроме самой первой (та так же держит рамку `<dl>`).
 *
 * columns=1 — для узких контекстов (панель Poster в половину окна): там
 * колонок нет вовсе ни на одном экране, поэтому sm:-разделители между
 * колонками не нужны, только верхняя линия у каждой ячейки кроме первой.
 */
function factCell(index: number, columns: 1 | 3): string {
  const isFirstCol = index % columns === 0;
  const isFirstRow = index < columns;
  const parts = ["py-6"];

  if (index !== 0) parts.push("border-t border-rule");

  if (columns === 3) {
    parts.push(isFirstRow ? "sm:border-t-0" : "sm:border-t sm:border-rule");
    parts.push(isFirstCol ? "sm:pr-8" : "sm:border-l sm:pl-8 sm:pr-8");
  }

  return parts.join(" ");
}

export function HeroFacts({
  facts,
  columns = 3,
}: {
  facts: HeroFact[];
  /** Колонок на sm+. 1 — держать список в одну колонку на любой ширине. */
  columns?: 1 | 3;
}) {
  if (facts.length === 0) return null;

  return (
    <dl
      className={cn(
        "mt-16 grid border-t border-rule md:mt-24",
        columns === 3 && "sm:grid-cols-3",
      )}
      data-reveal
      style={revealDelay(3)}
    >
      {facts.map((fact, index) => (
        <div key={fact.value} className={factCell(index, columns)}>
          <dt className="font-display text-h3">{fact.value}</dt>
          <dd className="mt-2 text-small text-fg-muted">{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default HeroFacts;
