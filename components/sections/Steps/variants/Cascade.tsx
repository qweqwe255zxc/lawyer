import Image from "next/image";
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
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StepsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-14 md:mb-20"
        />

        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            return (
              <li
                key={item.number}
                data-reveal
                style={{ ...revealDelay(index), marginTop: index * 28 }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="tabular absolute -left-3 -top-3 z-10 flex size-9 items-center justify-center rounded-control bg-accent text-body font-bold text-accent-fg"
                >
                  {item.number}
                </span>

                <Card variant="framed" className="h-full">
                  {Icon ? (
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 text-accent" />
                  ) : null}

                  <h3 className="mt-4 font-heading text-h3">{item.title}</h3>
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
