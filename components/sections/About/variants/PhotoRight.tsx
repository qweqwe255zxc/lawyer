import { Section } from "@/components/ui/Section";
import { AboutLayout } from "../parts/AboutLayout";
import type { AboutSection } from "@/types/site";

/** Текст слева (5/12), фото справа (7/12). Вариант по умолчанию. */
export function PhotoRight(props: AboutSection) {
  const { id, surface = "paper", photo } = props;

  if (process.env.NODE_ENV !== "production" && !photo) {
    console.warn(`[About] Секция "${id}": variant="photo-right" требует photo.`);
  }
  if (!photo) return null;

  return (
    <Section id={id} surface={surface}>
      <AboutLayout {...props} photo={photo} photoFirst={false} />
    </Section>
  );
}

export default PhotoRight;
