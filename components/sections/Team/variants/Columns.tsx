import { Section } from "@/components/ui/Section";
import { TeamList } from "../parts/TeamList";
import type { TeamSection } from "@/types/site";

/** Три человека в ряд на линейках. Вариант по умолчанию в «Экономе». */
export function Columns(props: TeamSection) {
  const { id, surface = "paper" } = props;

  return (
    <Section id={id} surface={surface}>
      <TeamList {...props} columns="md:grid-cols-3" />
    </Section>
  );
}

export default Columns;
