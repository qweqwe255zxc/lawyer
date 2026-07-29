import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { PricingSection } from "@/types/site";

/**
 * Не используется на текущем лендинге (нет в site.config.sections),
 * оставлена про запас для других проектов на этом шаблоне.
 * Выделенный тариф подсвечивается линией --color-fg, не акцентом —
 * акцентная заливка занята под primary-кнопку и CTA-блок.
 * Если хотя бы у одного плана задан photo — variant форсируется в
 * "cards": табличная сетка с border-top/border-l не умеет выравнивать
 * фото произвольной высоты, только карточки с фиксированным aspect-ratio.
 */
export function Pricing(props: PricingSection) {
  const {
    id,
    surface = "paper",
    variant = "table",
    number,
    eyebrow,
    title,
    lead,
    items,
    note,
  } = props;

  const hasPhoto = items.some((plan) => plan.photo);

  if (process.env.NODE_ENV !== "production" && hasPhoto && variant === "table") {
    console.warn(
      `[Pricing] Секция "${id}": variant="table" не поддерживает photo — форсирован variant="cards".`,
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
            isTable ? "md:grid-cols-3" : "gap-gutter md:grid-cols-3",
          )}
        >
          {items.map((plan, index) => {
            const body = (
              <>
                {plan.photo ? (
                  <div className="ui-media relative mb-5 aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={plan.photo}
                      alt={plan.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <h3 className="font-display text-h3">{plan.name}</h3>
                <p className="tabular mt-6 font-display text-stat">
                  {plan.price}
                  {plan.unit ? (
                    <span className="ml-2 text-body text-fg-muted">
                      {plan.unit}
                    </span>
                  ) : null}
                </p>
                {plan.text ? (
                  <p className="mt-4 text-body text-fg-muted">{plan.text}</p>
                ) : null}

                <ul className="mt-7 space-y-2.5 border-t border-rule pt-7">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-small text-fg-muted"
                    >
                      <span aria-hidden="true" className="select-none">
                        —
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.action ? (
                  <div className="mt-8">
                    <Button
                      href={plan.action.href}
                      variant={plan.action.variant ?? "secondary"}
                      size="sm"
                    >
                      {plan.action.label}
                    </Button>
                  </div>
                ) : null}
              </>
            );

            return isTable ? (
              <div
                key={plan.name}
                data-reveal
                style={revealDelay(index)}
                className={cn(
                  "border-t pt-8",
                  // ui-featured-border / --card-featured-border вместо
                  // жёсткого border-fg: в «Экономе» это та же линия
                  // --color-fg, в «Стандарте» выделенный тариф выходит
                  // вперёд акцентной рамкой.
                  plan.featured ? "ui-featured-border" : "border-rule",
                  index > 0 && "mt-10 md:mt-0 md:border-l md:border-l-rule md:pl-9",
                  index < items.length - 1 && "md:pr-9",
                )}
              >
                {body}
              </div>
            ) : (
              <Card
                key={plan.name}
                variant="framed"
                className={cn("h-full", plan.featured && "ui-card--featured")}
              >
                <div data-reveal style={revealDelay(index)}>
                  {body}
                </div>
              </Card>
            );
          })}
        </div>

        {note ? (
          <p className="mt-10 max-w-[62ch] text-small text-fg-muted">{note}</p>
        ) : null}
      </Container>
    </Section>
  );
}

export default Pricing;
