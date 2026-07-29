import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepsRailList } from "../parts/StepsRailList";
import type { StepsSection } from "@/types/site";

/**
 * Та же линейка, но в две колонки — для длинных описаний шагов, которым
 * в четырёх колонках тесно.
 */
export function Stack(props: StepsSection) {
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
        <StepsRailList items={items} columns="md:grid-cols-2" />
      </Container>
    </Section>
  );
}

export default Stack;
