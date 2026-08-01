import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { FeatureContent } from "../parts/FeatureContent";
import { FeaturesHeader } from "../parts/FeaturesHeader";
import type { FeaturesSection } from "@/types/site";

/**
 * Заголовок пилюлей по центру, карточки со ссылкой «Подробнее»
 * (`item.link`) и опциональной кнопкой под сеткой (`action`).
 */
export function CardsCta(props: FeaturesSection) {
  const { id, surface = "surface", number, eyebrow, title, lead, action, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <FeaturesHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-x-gutter gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.title} data-reveal style={revealDelay(index)}>
              <Card variant="framed" className="flex h-full flex-col">
                <div className="flex flex-1 flex-col">
                  <FeatureContent item={item} />

                  {item.link ? (
                    <Link
                      href={item.link.href}
                      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-small font-medium text-accent"
                    >
                      {item.link.label}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  ) : null}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {action ? (
          <div className="mt-12 text-center md:mt-16">
            <Button href={action.href} variant={action.variant ?? "primary"}>
              {action.label}
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export default CardsCta;
