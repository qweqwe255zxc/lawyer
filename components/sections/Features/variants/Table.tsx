import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { FeatureContent } from "../parts/FeatureContent";
import type { FeaturesSection } from "@/types/site";

/**
 * Ячейка табличной сетки: границы рисует сетка, а не карточка.
 *
 * lastAlone — последний элемент остался один в своём ряду (нечётное
 * число элементов при columns=2, остаток 1 или 2 при columns=3): без
 * col-span его верхняя линия покрывала бы только половину/треть ширины
 * ряда, а не всю строку — читалось как оборванная граница. col-span
 * растягивает ячейку на всю ширину ряда, линия дорисовывается сама.
 */
function tableCell(index: number, columns: number, lastAlone: boolean): string {
  const parts = ["border-t border-rule py-9 md:py-11"];

  if (lastAlone) {
    // Полные имена классов — Tailwind не собирает col-span-* из шаблонной
    // строки со вставкой переменной, ему нужен буквальный токен в исходнике.
    parts.push(columns === 2 ? "md:col-span-2" : "md:col-span-3");
    return parts.join(" ");
  }

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
    iconShape,
  } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
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
          {items.map((item, index) => {
            const lastAlone =
              index === items.length - 1 && items.length % columns === 1;

            return (
              <div
                key={item.title}
                data-reveal
                style={revealDelay(index % columns)}
                className={tableCell(index, columns, lastAlone)}
              >
                <FeatureContent item={item} />
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default Table;
