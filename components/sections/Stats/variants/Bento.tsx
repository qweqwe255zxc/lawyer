import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

/**
 * Заголовок пилюлей по центру, дальше — двухколоночная сетка, где каждая
 * карточка получает свою оправу по позиции: первая — акцентная рамка
 * (`bordered-accent`), последняя — на ink-поверхности (карточка сама не
 * знает про тариф, глубину даёт `Card`), остальные — обычная `framed`.
 * Точную асимметрию ширин колонок в референсе (2×2 bento с разными
 * пропорциями по рядам) не повторяем — это отдельная задача на
 * произвольные col-span/row-span, а не смену токенов (см. docs/
 * section-system.md, ниша «Бизнес — SaaS»); здесь двухколоночный поток,
 * устойчивый к любому числу items.
 */
export function Bento(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;
  const last = items.length - 1;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StatsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-12 md:mb-16"
        />

        <dl className="grid gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);
            const isFirst = index === 0;
            const isLast = index === last;

            return (
              <div
                key={item.label}
                data-reveal
                style={revealDelay(index)}
                data-surface={isLast ? "ink" : undefined}
                className={isLast ? "bg-bg text-fg" : undefined}
              >
                <Card variant={isFirst ? "bordered-accent" : "framed"}>
                  {Icon ? (
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 text-accent" />
                  ) : null}

                  <dt className="tabular mt-4 font-display text-h2">
                    {item.value}
                    {item.suffix ? <span className="text-fg-muted">{item.suffix}</span> : null}
                  </dt>

                  {item.text ? (
                    <p className="mt-3 measure text-small text-fg-muted">{item.text}</p>
                  ) : (
                    <dd className="mt-3 text-caption font-medium uppercase text-fg-muted">
                      {item.label}
                    </dd>
                  )}
                </Card>
              </div>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}

export default Bento;
