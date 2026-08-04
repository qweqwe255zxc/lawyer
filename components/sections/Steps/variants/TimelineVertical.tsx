import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { StepContent } from "../parts/StepContent";
import type { StepsSection } from "@/types/site";

/**
 * Вертикальный таймлайн: номера шагов сидят бейджами-нодами на оси,
 * карточки шагов расходятся по сторонам. Вариант по умолчанию в
 * «Стандарте» — единственная раскладка шагов, где есть объект (карточка),
 * способный принять глубину тарифа. (Раньше назывался "numbered-nodes" —
 * имя не роднило его с горизонтальным "timeline", хотя это тот же приём
 * в другой ориентации; теперь оба явно называются timeline-*.)
 */
export function TimelineVertical(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <ol className="relative mt-14 md:mt-20">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            // Стороны чередуются только с md: на мобильном ось всегда
            // слева, и все карточки стоят справа от неё.
            const onRight = index % 2 === 1;

            return (
              <li
                key={item.number}
                data-reveal
                style={revealDelay(index)}
                className={cn(
                  "relative pl-16 md:grid md:grid-cols-2 md:pl-0",
                  // Зазор между шагами — padding внутри <li>, а не margin
                  // между ними: отрезок оси рисуется абсолютом внутри того
                  // же <li> и должен дотягиваться до ноды следующего шага,
                  // а через внешний margin он бы рвался.
                  !isLast && "pb-10 md:pb-14",
                )}
              >
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-5 top-10 w-px -translate-x-1/2 bg-rule md:left-1/2"
                  />
                ) : null}

                {/* Нода: центр — 20px от левого края (мобильный) либо
                    середина строки (md+), ровно там же, где отрезок оси. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-rule bg-card md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="tabular text-caption font-medium text-fg-muted">
                    {item.number}
                  </span>
                </span>

                <div
                  className={
                    onRight ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:pr-12"
                  }
                >
                  {/* ui-card--live, а не hoverEffect: шаг никуда не ведёт,
                      и cursor-pointer из набора hoverEffect обещал бы клик,
                      которого нет. Переход по box-shadow и transform уже
                      задан в .ui-card — своего transition-shadow тут быть
                      не должно, он снял бы переход у подъёма в «Стандарте». */}
                  <Card variant="elevated" className="ui-card--live h-full">
                    <StepContent item={item} />
                  </Card>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default TimelineVertical;
