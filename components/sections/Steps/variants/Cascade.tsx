import Image from "next/image";
import type { CSSProperties } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { StepsHeader } from "../parts/StepsHeader";
import type { StepsSection } from "@/types/site";

/**
 * Карточки каскадом: каждая следующая ниже и правее предыдущей, номер —
 * акцентный бейдж на углу карточки. Тёмный/светлый вариант референса —
 * это не два разных компонента, а одни и те же данные на разной
 * поверхности: `surface="ink"` + `photo` у items даёт мрачную версию
 * («Creative Dark»), обычная поверхность без фото — светлую и лёгкую
 * («Playful Startup»). Фото — опционально, в подвале карточки.
 */
export function Cascade(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, headerAlign, iconShape } =
    props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <StepsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align={headerAlign}
          className="mb-14 md:mb-20"
        />

        {/* items-start: без него grid по умолчанию растягивает (stretch)
            все ячейки ряда до высоты самой смещённой margin-top карточки —
            card с нулевым отступом раздувался под эту высоту (h-full), а
            низ у всех карточек в итоге выравнивался по одной линии вместо
            того, чтобы «съезжать» вниз вместе с верхом. */}
        <ol className="grid items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            return (
              <li
                key={item.number}
                data-reveal
                // Смещение считаем по остатку от РЕАЛЬНОГО числа колонок
                // на каждом брейкпоинте (2 на sm, 3 на lg, 4 на xl), иначе
                // с фиксированным % 4 (посчитанным под lg:grid-cols-4)
                // каскад ломался везде, где колонок меньше четырёх: ниже
                // sm — вертикальный список получал неровный повторяющийся
                // ритм вместо нулевого отступа, а в диапазоне sm–lg (2
                // колонки) и lg–xl (3 колонки) смещение считалось не под
                // ту раскладку и «наезжало» на обычный поток строк.
                // mt-0 ниже sm — там всего одна колонка и каскада нет вовсе.
                style={
                  {
                    ...revealDelay(index),
                    "--offset-sm": `${(index % 2) * 28}px`,
                    "--offset-lg": `${(index % 3) * 28}px`,
                    "--offset-xl": `${(index % 4) * 28}px`,
                  } as CSSProperties
                }
                className="relative mt-0 sm:mt-[var(--offset-sm)] lg:mt-[var(--offset-lg)] xl:mt-[var(--offset-xl)]"
              >
                <span
                  aria-hidden="true"
                  className="tabular absolute -left-3 -top-3 z-10 flex size-9 items-center justify-center rounded-control bg-accent text-body font-bold text-accent-fg"
                >
                  {item.number}
                </span>

                {/* min-h вместо h-full: родительский <ol> — items-start
                    (см. выше), у <li> нет заданной высоты, растягивать
                    карточку не подо что. Общий пол высоты — то, чем можно
                    выровнять длину карточек без items-start, не потеряв
                    сам каскад (полная растяжка по высоте ряда убрала бы
                    смещение). */}
                <Card variant="framed" className="flex min-h-[19rem] flex-col">
                  {Icon ? (
                    <span className="icon-tile">
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-6" />
                    </span>
                  ) : null}

                  <h3 className="mt-4 max-w-[22ch] font-heading text-h3">{item.title}</h3>
                  <p className="mt-3 text-body text-fg-muted">{item.text}</p>

                  {item.photo ? (
                    <div className="ui-media relative mt-6 aspect-[4/3] w-full shrink-0 overflow-hidden">
                      <Image
                        src={item.photo}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </Card>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default Cascade;
