import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ASPECT_PAIR_3_4, fillLastRowAspectClasses, fillLastRowClasses } from "@/lib/gridFill";
import { revealDelay } from "@/lib/reveal";
import { MemberContent } from "../parts/MemberContent";
import { TeamBannerBlock } from "../parts/TeamBannerBlock";
import type { TeamSection } from "@/types/site";

const GRID_BREAKPOINTS = [
  { prefix: "md:", cols: 3 },
  { prefix: "xl:", cols: 4 },
] as const;

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
    banner,
    fillLastRow = true,
  } = props;
  const spanClasses = fillLastRow ? fillLastRowClasses(items.length, GRID_BREAKPOINTS) : [];
  const aspectClasses = fillLastRow
    ? fillLastRowAspectClasses(items.length, GRID_BREAKPOINTS, ASPECT_PAIR_3_4)
    : [];

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <ul className="mt-14 grid gap-gutter md:mt-20 md:grid-cols-3 xl:grid-cols-4">
          {items.map((member, index) => (
            <li key={member.name} className={spanClasses[index] || undefined}>
              <Card variant="framed" className="flex h-full flex-col">
                <div
                  className="flex flex-1 flex-col"
                  data-reveal
                  style={revealDelay(index)}
                >
                  <MemberContent member={member} mediaInset mediaAspectClassName={aspectClasses[index]} />
                </div>
              </Card>
            </li>
          ))}
        </ul>

        {banner ? (
          <TeamBannerBlock banner={banner} tone={banner.tone ?? "soft"} className="mt-12 md:mt-16" />
        ) : null}
      </Container>
    </Section>
  );
}

export default Cards;
