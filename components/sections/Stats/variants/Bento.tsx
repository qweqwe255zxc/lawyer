import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

const GRID_BREAKPOINTS = [{ prefix: "md:", cols: 2 }] as const;

/**
 * Заголовок пилюлей по центру, дальше — двухколоночная сетка. Оправу
 * карточки решает `item.highlight` ("accent" — рамка, "tint" — мягкая
 * тонировка фона `bg-fg/6%`, темнее в светлой теме/светлее в тёмной —
 * не полная инверсия поверхности, она читалась как сломанная чёрная
 * карточка), остальные — обычная `framed`. Без явного highlight ни у
 * одного item — дефолт только на первой карточке (accent): автовыделение
 * ПОСЛЕДНЕЙ карточки убрано — оно срабатывало и там, где это не был
 * содержательный акцент, а просто «какая карточка оказалась последней»,
 * и читалось как случайное затемнение. Если нужна пара акцентов —
 * ставить item.highlight явно на нужном элементе.
 * Растягивание последнего неполного ряда (`fillLastRow`, дефолт `true`)
 * теперь общая логика `lib/gridFill.ts` — при нечётном числе items
 * последняя карточка по-прежнему растягивается на обе колонки, но это
 * можно выключить пропом.
 * Точную асимметрию ширин колонок в референсе (2×2 bento с разными
 * пропорциями по рядам) не повторяем — это отдельная задача на
 * произвольные col-span/row-span, а не смену токенов (см. docs/
 * section-system.md, ниша «Стандарт — сложный SaaS»); здесь
 * двухколоночный поток, устойчивый к любому числу items.
 */
export function Bento(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, iconShape, fillLastRow = true } = props;
  const spanClasses = fillLastRow ? fillLastRowClasses(items.length, GRID_BREAKPOINTS) : [];

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
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
            // Явный item.highlight всегда главнее позиции. Без него —
            // прежний дефолт: первая карточка accent, последняя tint
            // (только при 2+ элементах — с одним item совпадение "первая
            // и последняя" раньше давало две конфликтующие оправы разом).
            const highlight = item.highlight ?? (index === 0 ? "accent" : undefined);

            return (
              <Card
                key={item.label}
                variant={highlight === "accent" ? "bordered-accent" : "framed"}
                data-reveal
                style={revealDelay(index)}
                // Раньше тут был полный инверт (data-surface="ink"):
                // на светлой теме давал чисто чёрную карточку, читалось
                // как сломанный контраст, а не «акцентный» бокс. Мягкий
                // тонированный фон вместо инверсии — темнее в светлой
                // теме, светлее в тёмной, но не противоположный цвет.
                className={cn(highlight === "tint" && "bg-fg/[0.06]", spanClasses[index])}
              >
                {Icon ? (
                  <span className="icon-tile">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-6" />
                  </span>
                ) : null}

                <dt className="tabular mt-4 font-display text-h2">
                  {item.value}
                  {item.suffix ? <span className="text-fg-muted">{item.suffix}</span> : null}
                </dt>

                {item.text ? (
                  // text заменяет label (см. docs/section-system.md, §2.2) —
                  // dd, а не p: dt без пары dd — невалидный dl.
                  <dd className="mt-3 measure text-small text-fg-muted">{item.text}</dd>
                ) : (
                  <dd className="mt-3 text-caption font-medium uppercase text-fg-muted">
                    {item.label}
                  </dd>
                )}
              </Card>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}

export default Bento;
