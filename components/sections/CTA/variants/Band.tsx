import { Section } from "@/components/ui/Section";
import { CtaBody } from "../parts/CtaBody";
import type { CtaSection } from "@/types/site";

/**
 * Полоса: широкий вертикальный ритм (spacing="lg"), тот же, что у hero.
 * Вариант по умолчанию — единственный акцентный блок на странице должен
 * читаться как остановка, а не как ещё один абзац.
 */
export function Band(props: CtaSection) {
  const { id, surface = "accent" } = props;

  return (
    <Section id={id} surface={surface} spacing="lg">
      <CtaBody {...props} />
    </Section>
  );
}

export default Band;
