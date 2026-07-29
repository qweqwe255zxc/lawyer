import { Section } from "@/components/ui/Section";
import { AboutLayout } from "../parts/AboutLayout";
import type { AboutSection } from "@/types/site";

/**
 * Зеркальная раскладка: фото слева (7/12), текст справа (5/12).
 * Порядок меняется через md:order-*, а не перестановкой в разметке —
 * на мобильном (одна колонка) текст обязан идти первым в обоих вариантах.
 */
export function PhotoLeft(props: AboutSection) {
  const { id, surface = "paper" } = props;

  return (
    <Section id={id} surface={surface}>
      <AboutLayout {...props} photoFirst />
    </Section>
  );
}

export default PhotoLeft;
