import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { FeatureContent } from "../parts/FeatureContent";
import type { FeaturesSection } from "@/types/site";

/**
 * Ячейка без ссылок: границы рисует сетка, а не карточка.
 *
 * lastAlone — последний элемент остался один в своём ряду (нечётное
 * число элементов при columns=2, остаток 1 или 2 при columns=3): без
 * col-span его верхняя линия покрывала бы только половину/треть ширины
 * ряда, а не всю строку — читалось как оборванная граница. col-span
 * растягивает ячейку на всю ширину ряда, линия дорисовывается сама.
 */
function plainCell(index: number, columns: number, lastAlone: boolean): string {
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
 * Ячейка со стрелкой-ссылкой в углу (включается сама, если хотя бы у
 * одного item задан `link`) — та же логика границ, что и plainCell, плюс
 * горизонтальный паддинг.
 *
 * pr-9 — базовый (не только md:), потому что стрелка абсолютно
 * спозиционирована при ЛЮБОЙ ширине (top-9 right-9): без базового
 * отступа заголовок без иконки залезал бы под стрелку ниже 768px.
 * pl-9 стоит рядом тем же базовым классом — раньше его не было, и на
 * мобильном контент прижимался к левому краю с гораздо большим отступом
 * справа, чем слева (ощущение сдвига влево); на брейкпоинтах, где слева
 * нет ни рамки, ни повода для отступа (первая колонка ряда), паддинг
 * гасится явным `pl-0`.
 */
function linkedCell(index: number, columns: number, lastAlone: boolean): string {
  const parts = ["border-t border-rule py-9 pr-9 pl-9 md:py-11"];

  if (lastAlone) {
    // columns===3 сетка переходит на 3 колонки с lg (см. grid ниже,
    // sm:grid-cols-2 lg:grid-cols-3) — col-span должен переключаться
    // на том же брейкпоинте, иначе одинокий последний элемент растянется
    // на всю ширину раньше, чем сетка реально стала трёхколоночной.
    parts.push(columns === 2 ? "md:col-span-2" : "lg:col-span-3");
    return parts.join(" ");
  }

  if (columns === 2) {
    parts.push(index % 2 === 1 ? "md:border-l md:pl-9" : "md:pl-0");
  } else {
    // Пока сетка реально двухколоночная (sm–lg, см. grid ниже) — рамка
    // по паттерну 2 колонок; с lg, где включается настоящий 3-й столбец,
    // пересчитываем по остатку от 3 и явно снимаем то, что поставил
    // sm-паттерн там, где трёхколоночному рамка не нужна (index%3===0).
    parts.push(index % 2 === 1 ? "sm:border-l sm:pl-9" : "sm:pl-0");
    parts.push(index % 3 !== 0 ? "lg:border-l lg:pl-9" : "lg:border-l-0 lg:pl-0");
  }

  return parts.join(" ");
}

/**
 * Таблица услуг: линейки-разделители, без карточек и теней. Плотно и
 * опрятно — вариант по умолчанию в «Экономе».
 *
 * Стрелка-ссылка в углу ячейки раньше жила отдельным вариантом
 * (`table-links`) — отличался только этим да двухколоночной шапкой (title
 * слева, lead справа). Не заводить `table-links` обратно отдельным
 * variant: стрелка теперь включается сама, если хотя бы у одного item
 * задан `link` (тот же приём, что arrow-link в cards/bento), а шапка
 * унифицирована на обычный SectionHeader.
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

  const hasLinks = items.some((item) => item.link);
  const ArrowIcon = hasLinks ? getIcon("arrowUpRight") : null;

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
            hasLinks && columns === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : columns === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3",
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
                className={cn(
                  "relative",
                  hasLinks
                    ? linkedCell(index, columns, lastAlone)
                    : plainCell(index, columns, lastAlone),
                )}
              >
                {item.link ? (
                  // top-9/right-9 (md:11/11) — тот же отступ, что и py/pr
                  // самой ячейки. p-2 -m-2 — свой внутренний паддинг
                  // вокруг иконки (как у .icon-tile в остальных
                  // вариантах) с компенсацией отрицательным margin, чтобы
                  // сама иконка осталась на том же top-9/right-9 месте.
                  <Link
                    href={item.link.href}
                    aria-label={item.link.label}
                    className="absolute top-9 right-9 -m-2 p-2 text-fg-muted transition-colors hover:text-fg md:top-11 md:right-11"
                  >
                    {ArrowIcon ? (
                      <ArrowIcon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                    ) : null}
                  </Link>
                ) : null}

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
