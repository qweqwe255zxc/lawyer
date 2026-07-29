import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
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
 * Подложка под цифрами. flat — как было: линейки сверху/снизу секции,
 * блока нет. elevated/bordered — цифры собираются в один монолитный
 * блок, и тогда линейки секции снимаются: сквозная линейка во всю
 * ширину визуально перечёркивала бы поднятый блок.
 */
function containerClasses(
  containerVariant: NonNullable<StatsSection["containerVariant"]>,
): string | undefined {
  switch (containerVariant) {
    case "elevated":
      return "rounded-card bg-card p-7 shadow-md md:p-9";
    case "bordered":
      return "rounded-card border border-accent-border bg-card p-7 md:p-9";
    default:
      return undefined;
  }
}

/**
 * Фон тот же, что у hero, но плотность другая: после разреженного hero
 * сразу идёт сжатая полоса с цифрами. Цифры всегда --color-fg, без акцента.
 */
export function Stats(props: StatsSection) {
  const {
    id,
    surface = "paper",
    variant = "band",
    containerVariant = "flat",
    number,
    items,
  } = props;
  const isBand = variant === "band";
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
        {/* Секция без заголовка (SectionHeader тут не участвует), но номер
            обязан быть виден — иначе счёт визуально прыгает с 01 на 03. */}
        {number ? (
          <p className="tabular mb-6 text-caption font-medium uppercase text-fg-muted md:mb-8">
            {number}
          </p>
        ) : null}

        <dl
          className={cn(
            "grid",
            isBand
              ? "grid-cols-2 md:grid-cols-4"
              : "gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4",
            containerClasses(containerVariant),
          )}
        >
          {items.map((item, index) => (
            <div
              key={item.label}
              data-reveal
              style={revealDelay(index)}
              className={isBand ? bandCell(index) : undefined}
            >
              <dt className="tabular font-display text-stat">
                {item.value}
                {item.suffix ? (
                  <span className="text-fg-muted">{item.suffix}</span>
                ) : null}
              </dt>
              <dd className="mx-auto mt-3 max-w-[22ch] text-caption font-medium uppercase text-fg-muted">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export default Stats;
