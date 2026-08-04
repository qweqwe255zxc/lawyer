import { revealDelay } from "@/lib/reveal";
import type { HeroFact } from "@/types/site";

/**
 * Раскладка рассчитана на 3 колонки (sm:grid-cols-3). Деление на строки
 * идёт по остатку от 3, не по позиции в массиве: при 4+ фактах вторая
 * строка сетки повторяет то же правило, что и первая — левый край строки
 * без sm:border-l, сама строка (кроме самой первой) со своим sm:border-t,
 * которого нет у ячеек первой строки (её сверху отделяет рамка `<dl>`).
 * На мобильном (одна колонка) строк без границы не нужно — линию задаёт
 * каждая ячейка, кроме самой первой (та так же держит рамку `<dl>`).
 */
function factCell(index: number): string {
  const isFirstCol = index % 3 === 0;
  const isFirstRow = index < 3;
  const parts = ["py-6"];

  if (index !== 0) parts.push("border-t border-rule");
  parts.push(isFirstRow ? "sm:border-t-0" : "sm:border-t sm:border-rule");
  parts.push(isFirstCol ? "sm:pr-8" : "sm:border-l sm:pl-8 sm:pr-8");

  return parts.join(" ");
}

export function HeroFacts({ facts }: { facts: HeroFact[] }) {
  if (facts.length === 0) return null;

  return (
    <dl
      className="mt-16 grid border-t border-rule sm:grid-cols-3 md:mt-24"
      data-reveal
      style={revealDelay(3)}
    >
      {facts.map((fact, index) => (
        <div key={fact.value} className={factCell(index)}>
          <dt className="font-display text-h3">{fact.value}</dt>
          <dd className="mt-2 text-small text-fg-muted">{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default HeroFacts;
