import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { MemberContent } from "../parts/MemberContent";
import type { TeamSection } from "@/types/site";

/**
 * Те же три колонки, но каждый человек в Card variant="framed".
 * Вариант по умолчанию в «Стандарте»: единственная раскладка команды, где
 * есть объект, способный принять глубину тарифа.
 */
export function Cards(props: TeamSection) {
  const {
    id,
    surface = "paper",
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <ul className="mt-14 grid gap-x-gutter md:mt-20 md:grid-cols-3 gap-gutter">
          {items.map((member, index) => (
            <li key={member.name}>
              <Card variant="framed" className="h-full">
                <div data-reveal style={revealDelay(index)}>
                  <MemberContent member={member} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export default Cards;
