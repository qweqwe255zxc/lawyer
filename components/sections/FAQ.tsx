import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FaqSection } from "@/types/site";

/**
 * Ширина сужается до 760px — заметный контраст после широкого реестра
 * дел выше по странице. Раскрытый пункт подсвечивается линией слева.
 */
export function FAQ(props: FaqSection) {
  const {
    id,
    surface = "surface",
    variant = "narrow",
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  return (
    <Section id={id} surface={surface}>
      <Container width={variant === "narrow" ? "narrow" : "page"}>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className="mt-12 md:mt-16" data-reveal>
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}

export default FAQ;
