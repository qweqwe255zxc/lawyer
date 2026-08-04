import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepsRailList } from "../parts/StepsRailList";
import type { StepsSection } from "@/types/site";

/**
 * Та же линейка, но в две колонки — для длинных описаний шагов, которым
 * в четырёх колонках тесно.
 *
 * sm:grid-cols-2, а не md: — Rail (4 колонки на md:grid-cols-4) и Stack
 * до md оба были голой единой колонкой и визуально не отличались друг
 * от друга на мобильном/планшетном экране. С sm Stack уходит в две
 * колонки на 640px, на полторы сотни пикселей раньше Rail — разница
 * читается уже на телефонах в альбомной ориентации и на узких планшетах.
 */
export function Stack(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, iconShape } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />
        <StepsRailList items={items} columns="sm:grid-cols-2" />
      </Container>
    </Section>
  );
}

export default Stack;
