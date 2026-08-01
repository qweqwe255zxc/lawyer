import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { FeatureContent } from "../parts/FeatureContent";
import { FeaturesHeader } from "../parts/FeaturesHeader";
import type { FeaturesSection } from "@/types/site";

/**
 * Заголовок пилюлей по центру, асимметричная сетка: первый элемент —
 * во всю ширину (featured), остальные — обычная сетка в 2 колонки.
 * Точную асимметрию 2×2 bento из референса (разная ширина колонок по
 * рядам) не повторяем — как и в Stats/Bento и Steps/NumberedCards, это
 * отдельная задача на произвольные col-span/row-span (см. нишу
 * «Бизнес — SaaS», раздел 6), а не смена токенов; здесь устойчивый к
 * любому числу items поток.
 */
export function Bento(props: FeaturesSection) {
  const { id, surface = "surface", number, eyebrow, title, lead, items } = props;

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

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              style={revealDelay(index)}
              className={cn(index === 0 && "sm:col-span-2")}
            >
              <Card variant={index === 0 ? "bordered-accent" : "framed"} className="h-full">
                <FeatureContent item={item} />

                {item.tags && item.tags.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="soft">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.link ? (
                  <Link
                    href={item.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-accent"
                  >
                    {item.link.label}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                ) : null}
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Bento;
