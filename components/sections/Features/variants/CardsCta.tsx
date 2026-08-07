import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ASPECT_PAIR_4_3, fillLastRowAspectClasses, fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { FeatureContent } from "../parts/FeatureContent";
import { FeaturesHeader } from "../parts/FeaturesHeader";
import type { FeaturesSection } from "@/types/site";

const GRID_BREAKPOINTS = [
  { prefix: "sm:", cols: 2 },
  { prefix: "lg:", cols: 3 },
] as const;

/**
 * Заголовок пилюлей по центру, карточки со ссылкой «Подробнее»
 * (`item.link`) и опциональной кнопкой под сеткой (`action`).
 */
export function CardsCta(props: FeaturesSection) {
  const {
    id,
    surface = "surface",
    number,
    eyebrow,
    title,
    lead,
    action,
    items,
    iconShape,
    headerAlign,
    fillLastRow = true,
  } = props;
  const spanClasses = fillLastRow ? fillLastRowClasses(items.length, GRID_BREAKPOINTS) : [];
  const aspectClasses = fillLastRow
    ? fillLastRowAspectClasses(items.length, GRID_BREAKPOINTS, ASPECT_PAIR_4_3)
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

        {/* 3 в ряд, не 4: на четырёх колонках карточке едва хватало ширины
            под заголовок и текст описания, всё выглядело зажатым. */}
        <div className="grid gap-x-gutter gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.title} data-reveal style={revealDelay(index)} className={spanClasses[index] || undefined}>
              <Card variant="framed" className="flex h-full flex-col">
                <div className="flex flex-1 flex-col">
                  <FeatureContent
                    item={item}
                    iconLayout="inline"
                    mediaInset
                    mediaAspectClassName={aspectClasses[index]}
                  />

                  {item.link ? (
                    <Link
                      href={item.link.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-small font-medium text-accent"
                    >
                      {item.link.label}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  ) : null}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {action ? (
          <div className="mt-12 text-center md:mt-16">
            <Button href={action.href} variant={action.variant ?? "primary"}>
              {action.label}
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export default CardsCta;
