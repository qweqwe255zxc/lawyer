import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import type { StatsSection } from "@/types/site";

/**
 * Фото с заголовком/лидом поверх (тёмный градиент снизу) слева, сетка
 * карточек-метрик справа. Требует `image` — без фото половине секции
 * нечем закрыться, поэтому без него этот вариант не рендерится вовсе
 * (роутер в dev-режиме предупреждает, см. Stats/index.tsx).
 */
export function Photo(props: StatsSection) {
  const { id, surface = "paper", title, lead, image, items } = props;

  if (!image) return null;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-2 md:items-stretch">
          <div className="ui-media-raised relative min-h-[22rem] overflow-hidden md:min-h-0">
            <Image
              src={image}
              alt={title ?? ""}
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />

            {title || lead ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-8 pt-20">
                {title ? (
                  <h2 className="font-heading text-h2 text-paper">{title}</h2>
                ) : null}
                {lead ? (
                  <p className="mt-3 max-w-[42ch] text-small text-paper/80">{lead}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);

              return (
                <Card key={item.label} variant="framed">
                  <div data-reveal style={revealDelay(index)}>
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-6 text-accent"
                      />
                    ) : null}

                    <dt className="tabular mt-4 font-display text-h2">
                      {item.value}
                      {item.suffix ? (
                        <span className="text-fg-muted">{item.suffix}</span>
                      ) : null}
                    </dt>

                    <dd className="mt-2 text-caption font-medium uppercase text-fg-muted">
                      {item.label}
                    </dd>
                  </div>
                </Card>
              );
            })}
          </dl>
        </div>
      </Container>
    </Section>
  );
}

export default Photo;
