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
 * Паддинг между колонками симметричный, но на крайней колонке с каждой
 * стороны блока горизонтальный паддинг обнуляется — иначе по краям всей
 * полосы остаётся пустой отступ поверх паддинга контейнера. pl/pr
 * прописаны отдельно (не через px-*), чтобы не было двух конфликтующих
 * классов на одном брейкпоинте — какой из них победит, зависело бы от
 * порядка генерации в Tailwind, а не от порядка в classList.
 */
function bandCell(index: number): string {
  const parts = ["py-4 text-center border-rule"];

  const mobileLeftEdge = index % 2 === 0;
  const mobileRightEdge = index % 2 === 1;
  const desktopLeftEdge = index % 4 === 0;
  const desktopRightEdge = index % 4 === 3;

  parts.push(mobileLeftEdge ? "pl-0" : "pl-4");
  parts.push(mobileLeftEdge ? "sm:pl-0" : "sm:pl-6");
  parts.push(desktopLeftEdge ? "md:pl-0" : "md:pl-8");

  parts.push(mobileRightEdge ? "pr-0" : "pr-4");
  parts.push(mobileRightEdge ? "sm:pr-0" : "sm:pr-6");
  parts.push(desktopRightEdge ? "md:pr-0" : "md:pr-8");

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
            "grid grid-cols-2 md:grid-cols-4",
            containerClasses(containerVariant),
          )}
        >
          <StatItems items={items} cellClassName={bandCell} align="center" />
        </dl>
      </Container>
    </Section>
  );
}

export default Band;
