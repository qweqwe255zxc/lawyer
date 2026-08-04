import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { FeatureContent } from "../parts/FeatureContent";
import type { FeaturesSection } from "@/types/site";

/**
 * Ячейка табличной сетки: та же логика границ, что и в Table.tsx —
 * включая lastAlone (последний элемент один в ряду получает col-span на
 * всю ширину, иначе верхняя линия обрывается на середине/трети ряда).
 */
function cellClass(index: number, columns: number, lastAlone: boolean): string {
  const parts = ["border-t border-rule py-9 md:py-11"];

  if (lastAlone) {
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
 * Заголовок в две колонки (заголовок слева, лид справа) вместо
 * обычного `SectionHeader` с колонтитулом на поле — свой заголовок
 * только у этого варианта, поэтому он не вынесен в parts/. Дальше —
 * та же табличная сетка, что у Table, но со ссылкой-стрелкой в углу
 * ячейки вместо простого текста.
 */
export function TableLinks(props: FeaturesSection) {
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
  const ArrowIcon = getIcon("arrowUpRight");

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        {number || eyebrow || title || lead ? (
          <div className="grid gap-x-gutter gap-y-6 border-b border-rule pb-9 md:grid-cols-2 md:pb-11">
            <div>
              {number ? (
                <p
                  className="tabular text-caption font-medium uppercase text-fg-muted"
                  data-reveal
                >
                  {number}
                </p>
              ) : null}
              {eyebrow ? (
                <p
                  className={cn(
                    "text-caption font-medium uppercase text-accent",
                    number && "mt-3",
                  )}
                  data-reveal
                >
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-3 font-heading text-h1" data-reveal>
                  {title}
                </h2>
              ) : null}
            </div>

            {lead ? (
              <p className="text-lead text-fg-muted md:self-end" data-reveal>
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className={cn("grid", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}
        >
          {items.map((item, index) => {
            const lastAlone =
              index === items.length - 1 && items.length % columns === 1;

            return (
              <div
                key={item.title}
                data-reveal
                style={revealDelay(index % columns)}
                className={cn("relative", cellClass(index, columns, lastAlone))}
              >
                {item.link ? (
                  // top-9/right-9 (md:11/11) — тот же отступ, что и py/pr
                  // самой ячейки: раньше right-0 сажал стрелку впритык к
                  // правому краю при паддинге сверху, и она читалась не по
                  // центру своего угла, а прижатой к одной стороне.
                  // p-2 -m-2 — свой внутренний паддинг вокруг иконки (как у
                  // .icon-tile в остальных вариантах, а не голая иконка без
                  // отступов) с компенсацией отрицательным margin, чтобы
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

export default TableLinks;
