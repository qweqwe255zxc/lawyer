import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { PlanContent } from "../parts/PlanContent";
import type { PricingSection } from "@/types/site";

/**
 * Три тарифа в колонках с разделителями, без карточек. Вариант по
 * умолчанию в «Экономе».
 *
 * Выделенный тариф (plan.featured) подсвечивается линией
 * --card-featured-border: в «Экономе» это --color-fg (акцентная заливка
 * занята под primary-кнопку и CTA-блок), в «Стандарте» — акцентная рамка.
 *
 * ВАЖНО: несовместим с photo на планах — рамки рисует grid, он не умеет
 * выравнивать фото произвольной высоты. Роутер уводит секцию в Cards сам.
 */
export function Table(props: PricingSection) {
  const {
    id,
    surface = "paper",
    number,
    eyebrow,
    title,
    lead,
    items,
    note,
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

        <div className={cn("mt-14 grid md:mt-20", "md:grid-cols-3")}>
          {items.map((plan, index) => (
            <div
              key={plan.name}
              data-reveal
              style={revealDelay(index)}
              className={cn(
                "border-t pt-8",
                plan.featured ? "ui-featured-border" : "border-rule",
                index > 0 && "mt-10 md:mt-0 md:border-l md:border-l-rule md:pl-9",
                index < items.length - 1 && "md:pr-9",
              )}
            >
              <PlanContent plan={plan} priceClassName="text-stat" />
            </div>
          ))}
        </div>

        {note ? (
          <p className="mt-10 max-w-[62ch] text-small text-fg-muted">{note}</p>
        ) : null}
      </Container>
    </Section>
  );
}

export default Table;
