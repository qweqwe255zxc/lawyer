import { Section } from "@/components/ui/Section";
import { TeamList } from "../parts/TeamList";
import type { TeamSection } from "@/types/site";

/**
 * Одна колонка — для команд из двух-трёх человек с длинными описаниями.
 * Аватар получает потолок ширины (max-w-xs): без него aspect-[3/4]
 * растянулся бы на всю ширину контейнера.
 */
export function Rows(props: TeamSection) {
  const { id, surface = "paper" } = props;

  return (
    <Section id={id} surface={surface}>
      <TeamList {...props} columns="md:grid-cols-1" avatarClassName="max-w-xs" />
    </Section>
  );
}

export default Rows;
