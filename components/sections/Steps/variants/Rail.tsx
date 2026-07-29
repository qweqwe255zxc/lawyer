import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepsRailList } from "../parts/StepsRailList";
import type { StepsSection } from "@/types/site";

/**
 * Четыре шага в строку на общей линейке. Вариант по умолчанию в
 * «Экономе»: плотно, без карточек, без теней.
 */
export function Rail(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />
        <StepsRailList items={items} columns="md:grid-cols-4" />
      </Container>
    </Section>
  );
}

export default Rail;
