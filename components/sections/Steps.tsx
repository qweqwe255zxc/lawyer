import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { StepsSection } from "@/types/site";

/**
 * Четыре шага на одной сплошной линейке. Номера — крупный сериф в цвете
 * линейки (не акцентом), чтобы не спорили с заголовками секции.
 * variant="numbered-nodes" — вертикальный таймлайн: та же шкала номеров
 * становится бейджами на оси, шаги расходятся карточками по сторонам.
 */
export function Steps(props: StepsSection) {
  const {
    id,
    surface = "paper",
    variant = "rail",
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

        {variant === "numbered-nodes" ? (
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
                    // Зазор между шагами — padding внутри <li>, а не
                    // margin между ними: отрезок оси рисуется абсолютом
                    // внутри того же <li> и должен дотягиваться до ноды
                    // следующего шага, а через внешний margin он бы
                    // рвался.
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

                  <div className={onRight ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:pr-12"}>
                    {/* ui-card--live, а не hoverEffect: шаг никуда не
                        ведёт, и cursor-pointer из набора hoverEffect
                        обещал бы клик, которого нет. Переход по
                        box-shadow и transform уже задан в .ui-card —
                        своего transition-shadow тут быть не должно, он
                        снял бы переход у подъёма в «Стандарте». */}
                    <Card variant="elevated" className="ui-card--live h-full">
                      <h3 className="font-display text-h3">{item.title}</h3>
                      <p className="mt-3 text-body text-fg-muted">{item.text}</p>

                      {item.meta ? (
                        <p className="mt-6 text-caption font-medium uppercase text-fg-muted">
                          {item.meta}
                        </p>
                      ) : null}
                    </Card>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <ol
            className={cn(
              "mt-14 grid gap-x-gutter md:mt-20",
              variant === "rail" ? "md:grid-cols-4" : "md:grid-cols-2",
            )}
          >
            {items.map((item, index) => (
              <li
                key={item.number}
                data-reveal
                style={revealDelay(index)}
                className={cn(
                  "border-t border-rule pt-7",
                  index > 0 && "mt-10 md:mt-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="tabular block font-display text-stat text-rule-strong"
                >
                  {item.number}
                </span>

                <h3 className="mt-5 font-display text-h3">{item.title}</h3>
                <p className="mt-3 text-body text-fg-muted">{item.text}</p>

                {item.meta ? (
                  <p className="mt-6 text-caption font-medium uppercase text-fg-muted">
                    {item.meta}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </Container>
    </Section>
  );
}

export default Steps;
