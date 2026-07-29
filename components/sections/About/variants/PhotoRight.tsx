import { Section } from "@/components/ui/Section";
import { AboutLayout } from "../parts/AboutLayout";
import type { AboutSection } from "@/types/site";

/** Текст слева (5/12), фото справа (7/12). Вариант по умолчанию. */
export function PhotoRight(props: AboutSection) {
  const { id, surface = "paper" } = props;

  return (
    <Section id={id} surface={surface}>
      <AboutLayout {...props} photoFirst={false} />
    </Section>
  );
}

export default PhotoRight;
