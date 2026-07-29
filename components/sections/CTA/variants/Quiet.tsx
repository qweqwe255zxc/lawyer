import { Section } from "@/components/ui/Section";
import { CtaBody } from "../parts/CtaBody";
import type { CtaSection } from "@/types/site";

/**
 * Тихий вариант: обычный ритм секции вместо расширенного. Для страниц,
 * где призыв повторяется несколько раз и не должен каждый раз занимать
 * целый экран.
 */
export function Quiet(props: CtaSection) {
  const { id, surface = "accent" } = props;

  return (
    <Section id={id} surface={surface} spacing="default">
      <CtaBody {...props} />
    </Section>
  );
}

export default Quiet;
