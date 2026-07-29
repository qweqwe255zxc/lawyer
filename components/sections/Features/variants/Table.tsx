import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { FeatureContent } from "../parts/FeatureContent";
import type { FeaturesSection } from "@/types/site";

/** Ячейка табличной сетки: границы рисует сетка, а не карточка. */
function tableCell(index: number, columns: number): string {
  const parts = ["border-t border-rule py-9 md:py-11"];

  if (columns === 2) {
    parts.push(index % 2 === 1 ? "md:border-l md:pl-9" : "md:pr-9");
  } else {
    if (index % 3 !== 0) parts.push("md:border-l md:pl-9");
    parts.push("md:pr-9");
  }

  return parts.join(" ");
}

/**
 * Таблица услуг: линейки-разделители, без карточек и теней. Плотно и
 * опрятно — вариант по умолчанию в «Экономе».
 *
 * ВАЖНО: этот вариант несовместим с photo на элементах. Рамки тут рисует
 * grid (border-top / border-left на ячейке), и он ничего не знает про
 * высоту картинки произвольного размера — сетка поплывёт. Роутер
 * (../index.tsx) это отслеживает и сам уводит секцию в Cards.
 */
export function Table(props: FeaturesSection) {
  const {
    id,
    surface = "surface",
    columns = 2,
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div
          className={cn(
            "mt-14 grid md:mt-20",
            columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
            "border-b border-rule",
          )}
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              style={revealDelay(index % columns)}
              className={tableCell(index, columns)}
            >
              <FeatureContent item={item} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Table;
