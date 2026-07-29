import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { FeaturesSection } from "@/types/site";

/** Ячейка табличной сетки: границы рисует сетка, а не карточка. */
function tableCell(index: number, columns: number): string {
  const parts = ["border-t border-rule py-9 md:py-11"];

  if (columns === 2) {
    parts.push(index % 2 === 1 ? "md:border-l md:pl-9" : "md:pr-9");
  } else {
    if (index % 3 !== 0) parts.push("md:border-l md:pl-9");
    parts.push("md:pr-9");
  }

  return parts.join(" ");
}

/**
 * Первая смена фона на странице (белая поверхность вместо бумаги).
 *
 * variant по умолчанию приходит из тарифа (SectionRenderer + lib/preset):
 * «Эконом» верстает таблицу услуг — плотно и опрятно, без теней;
 * «Стандарт» — карточки, потому что глубину пресета физически некуда
 * положить в табличной сетке (рамки там рисует grid, а не объект).
 *
 * Иконка сидит в .icon-tile: в «Экономе» плашки нет вообще (нулевой
 * паддинг, прозрачный фон — визуально голая иконка цвета fg-muted, как
 * и было), в «Стандарте» — акцентная плашка. Цвет иконка наследует от
 * плашки, поэтому text-* на самой иконке ставить нельзя.
 */
export function Features(props: FeaturesSection) {
  const {
    id,
    surface = "surface",
    variant = "table",
    columns = 2,
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  const hasPhoto = items.some((item) => item.photo);

  if (process.env.NODE_ENV !== "production" && hasPhoto && variant === "table") {
    console.warn(
      `[Features] Секция "${id}": variant="table" не поддерживает photo — форсирован variant="cards".`,
    );
  }

  const isTable = variant === "table" && !hasPhoto;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div
          className={cn(
            "mt-14 grid md:mt-20",
            columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
            isTable ? "border-b border-rule" : "gap-gutter",
          )}
        >
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            const content = (
              <>
                {item.photo ? (
                  <div className="ui-media relative mb-5 aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.photo}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {Icon ? (
                  <span className="icon-tile">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  </span>
                ) : null}

                <h3 className="mt-5 font-display text-h3">{item.title}</h3>
                <p className="mt-3 max-w-[46ch] text-body text-fg-muted">
                  {item.text}
                </p>

                {item.points && item.points.length > 0 ? (
                  <ul className="mt-6 space-y-2.5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-small text-fg-muted"
                      >
                        <span aria-hidden="true" className="select-none">
                          —
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            );

            return isTable ? (
              <div
                key={item.title}
                data-reveal
                style={revealDelay(index % columns)}
                className={tableCell(index, columns)}
              >
                {content}
              </div>
            ) : (
              <Card key={item.title} variant="framed" className="h-full">
                <div data-reveal style={revealDelay(index % columns)}>
                  {content}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default Features;
