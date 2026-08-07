import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { PlanContent } from "../parts/PlanContent";
import { PricingClosing } from "../parts/PricingClosing";
import { PricingComparisonTable } from "../parts/PricingComparisonTable";
import { PricingFootnotes } from "../parts/PricingFootnotes";
import { PricingQuoteBlock } from "../parts/PricingQuoteBlock";
import type { PricingSection } from "@/types/site";

const GRID_BREAKPOINTS = [{ prefix: "md:", cols: 3 }] as const;

/**
 * Econom: карточки с лейблом `tag` над названием (через `showTag` —
 * та же простая надпись, что и в других вариантах). У выделенного
 * тарифа — сплошная акцентная лента `badge` во всю ширину сверху
 * карточки, а не у каждого тарифа подряд: если лента одинаково тёмная
 * и тяжёлая на всех карточках, «выделенный» тариф больше не выделяется
 * ничем, а сама секция выглядит перегруженной.
 *
 * `overflow-hidden` на Card обязателен: без него прямоугольные углы
 * ленты торчали за скруглённый угол карточки — у Card есть свой радиус
 * (--radius-card), а у ленты нет собственного, если её ничего не клипует.
 */
export function Ribbon(props: PricingSection) {
  const {
    id,
    surface = "paper",
    number,
    eyebrow,
    title,
    lead,
    items,
    note,
    footnotes = [],
    closing,
    quote,
    comparison,
    fillLastRow = true,
  } = props;
  const spanClasses = fillLastRow ? fillLastRowClasses(items.length, GRID_BREAKPOINTS) : [];

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader number={number} eyebrow={eyebrow} title={title} lead={lead} />

        <div className="mt-14 grid gap-gutter md:mt-20 md:grid-cols-3">
          {items.map((plan, index) => (
            <Card
              key={plan.name}
              variant="framed"
              padded={false}
              className={cn(
                "flex h-full flex-col overflow-hidden",
                plan.featured && "ui-card--featured",
                spanClasses[index],
              )}
            >
              {plan.featured && plan.badge ? (
                <div className="bg-accent px-7 py-3 text-center text-caption font-medium uppercase text-accent-fg md:px-9">
                  {plan.badge}
                </div>
              ) : null}
              <div
                className="flex flex-1 flex-col p-7 md:p-9"
                data-reveal
                style={revealDelay(index)}
              >
                <PlanContent
                  plan={plan}
                  priceClassName="text-h2"
                  checkIcon
                  showTag={!plan.featured}
                />
              </div>
            </Card>
          ))}
        </div>

        {note ? <p className="mt-10 max-w-[62ch] text-small text-fg-muted">{note}</p> : null}

        {footnotes.length > 0 ? (
          <PricingFootnotes items={footnotes} className="mt-12 md:mt-16" />
        ) : null}

        {quote ? <PricingQuoteBlock quote={quote} className="mt-14 md:mt-20" /> : null}

        {comparison ? (
          <PricingComparisonTable comparison={comparison} className="mt-14 md:mt-20" />
        ) : null}

        {closing ? <PricingClosing closing={closing} className="mt-14 md:mt-20" /> : null}
      </Container>
    </Section>
  );
}

export default Ribbon;
