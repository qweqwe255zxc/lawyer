import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatCard } from "../parts/StatCard";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

/**
 * Тот же круглый значок-плашка, что и в Badge, но заголовок без пилюли
 * (eyebrowStyle="plain") — легче по тону. Карточки без hoverEffect: они
 * никуда не ведут, а этот проп добавляет cursor-pointer, который бы
 * соврал пользователю (см. docs/section-system.md, раздел 5). Раскраска
 * плашек по цвету item в референсе не переносится: в шаблоне один акцент
 * на всю страницу (см. правило «6 мест» в docs/presets.md), а не палитра
 * на карточку.
 */
export function Playful(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StatsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          eyebrowStyle="plain"
          className="mb-12 md:mb-16"
        />

        <dl className="grid gap-x-gutter gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Card key={item.label} variant="framed">
              <StatCard item={item} index={index} tile="round" />
            </Card>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export default Playful;
