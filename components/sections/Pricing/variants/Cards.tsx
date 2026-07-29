import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { PlanContent } from "../parts/PlanContent";
import type { PricingSection } from "@/types/site";

/**
 * Тарифы карточками. Вариант по умолчанию в «Стандарте» и единственный,
 * который поддерживает photo на планах.
 *
 * Выделенный тариф получает ui-card--featured: рамку
 * --card-featured-border и усиленную тень --card-featured-shadow.
 * В «Экономе» это по-прежнему просто линия --color-fg без тени.
 */
export function Cards(props: PricingSection) {
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

        <div className={cn("mt-14 grid md:mt-20", "gap-gutter md:grid-cols-3")}>
          {items.map((plan, index) => (
            <Card
              key={plan.name}
              variant="framed"
              className={cn("h-full", plan.featured && "ui-card--featured")}
            >
              <div data-reveal style={revealDelay(index)}>
                <PlanContent plan={plan} />
              </div>
            </Card>
          ))}
        </div>

        {note ? (
          <p className="mt-10 max-w-[62ch] text-small text-fg-muted">{note}</p>
        ) : null}
      </Container>
    </Section>
  );
}

export default Cards;
