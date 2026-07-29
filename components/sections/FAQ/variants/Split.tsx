import { Section } from "@/components/ui/Section";
import { FaqBody } from "../parts/FaqBody";
import type { FaqSection } from "@/types/site";

/**
 * Полная ширина контейнера (1240px). Имя историческое: собственной
 * двухколоночной раскладки у этого варианта нет и не было — он просто
 * шире. Если понадобится настоящий split (вопросы слева, ответы справа) —
 * это новый файл в variants/, а не правка этого.
 */
export function Split(props: FaqSection) {
  const { id, surface = "surface" } = props;

  return (
    <Section id={id} surface={surface}>
      <FaqBody {...props} width="page" />
    </Section>
  );
}

export default Split;
