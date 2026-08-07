import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { ASPECT_PAIR_4_3, fillLastRowAspectClasses, fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { FeatureContent } from "../parts/FeatureContent";
import { FeaturesHeader } from "../parts/FeaturesHeader";
import type { FeaturesSection } from "@/types/site";

const GRID_BREAKPOINTS = [{ prefix: "sm:", cols: 2 }] as const;

/**
 * Заголовок пилюлей по центру, асимметричная сетка: первый элемент —
 * во всю ширину (featured), остальные — обычная сетка в 2 колонки.
 * Точную асимметрию 2×2 bento из референса (разная ширина колонок по
 * рядам) не повторяем — как и в Stats/Bento и Steps/NumberedCards, это
 * отдельная задача на произвольные col-span/row-span (см. нишу
 * «Бизнес — SaaS», раздел 6), а не смена токенов; здесь устойчивый к
 * любому числу items поток.
 */
export function Bento(props: FeaturesSection) {
  const {
    id,
    surface = "surface",
    number,
    eyebrow,
    title,
    lead,
    items,
    iconShape,
    headerAlign,
    fillLastRow = true,
  } = props;
  // items[0] уже занимает всю ширину (sm:col-span-2 ниже) — остаток
  // считаем по «хвосту» после него.
  const restCount = Math.max(items.length - 1, 0);
  const restSpanClasses = fillLastRow ? fillLastRowClasses(restCount, GRID_BREAKPOINTS) : [];
  const restAspectClasses = fillLastRow
    ? fillLastRowAspectClasses(restCount, GRID_BREAKPOINTS, ASPECT_PAIR_4_3)
    : [];

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <FeaturesHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align={headerAlign}
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              style={revealDelay(index)}
              className={cn(index === 0 ? "sm:col-span-2" : restSpanClasses[index - 1])}
            >
              <Card
                variant={index === 0 ? "bordered-accent" : "framed"}
                className="flex h-full flex-col"
              >
                {/* Ссылка «Подробнее» прижата к низу (mt-auto), а не сразу
                    после текста — иначе в карточках с разной длиной текста
                    внутри одной строки она стояла бы на разной высоте.
                    Сама FeatureContent+tags — отдельная flex-колонка, чтобы
                    mt-auto ниже отсчитывался от полного объёма карточки. */}
                <div className="flex flex-1 flex-col">
                  <FeatureContent
                    item={item}
                    iconLayout="inline"
                    mediaInset
                    mediaAspectClassName={index === 0 ? undefined : restAspectClasses[index - 1]}
                  />

                  {item.tags && item.tags.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="soft">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {item.link ? (
                  <Link
                    href={item.link.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-small font-medium text-accent"
                  >
                    {item.link.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                ) : null}
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Bento;
