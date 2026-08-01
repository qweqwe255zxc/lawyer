import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { StepsHeader } from "../parts/StepsHeader";
import type { StepsSection } from "@/types/site";

/**
 * Заголовок пилюлей по центру, дальше — ряд карточек: круглая плашка
 * под иконкой, «N. Заголовок» одной строкой (номер шага в заголовке, а
 * не отдельным элементом — так короче), описание.
 */
export function Cards(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StepsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-12 md:mb-16"
        />

        <ol className="grid gap-x-gutter gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            return (
              <li key={item.number} data-reveal style={revealDelay(index)}>
                <Card variant="framed" className="h-full">
                  {Icon ? (
                    <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-badge-soft text-accent">
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                    </div>
                  ) : null}

                  <h3 className="font-heading text-h3">
                    {item.number}. {item.title}
                  </h3>
                  <p className="mt-3 text-body text-fg-muted">{item.text}</p>
                </Card>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default Cards;
