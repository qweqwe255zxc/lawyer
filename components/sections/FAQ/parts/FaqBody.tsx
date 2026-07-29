import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FaqSection } from "@/types/site";

interface FaqBodyProps extends FaqSection {
  /** Ширина колонки — единственное, чем отличаются варианты FAQ. */
  width: "narrow" | "page";
}

/**
 * Шапка + аккордеон. Форма самого списка (линейки или стопка карточек)
 * решается не тут, а тарифом — см. .ui-accordion в app/globals.css.
 */
export function FaqBody({
  width,
  number,
  eyebrow,
  title,
  lead,
  items,
}: FaqBodyProps) {
  return (
    <Container width={width}>
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
  );
}

export default FaqBody;
