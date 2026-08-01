import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FaqSupportCard } from "../parts/FaqSupportCard";
import type { FaqSection } from "@/types/site";

/**
 * Заголовок и опциональная карточка `support` слева, аккордеон справа —
 * настоящий split (в отличие от variant="split", который просто шире).
 * Колонки не выравнены по высоте специально: на длинном списке вопросов
 * левая колонка короче правой, и это нормально для сайдбара.
 */
export function SplitSidebar(props: FaqSection) {
  const { id, surface = "surface", number, eyebrow, title, lead, support, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4">
            {number ? (
              <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
                {number}
              </p>
            ) : null}
            {eyebrow ? (
              <p className="mt-2 text-caption font-medium uppercase text-accent" data-reveal>
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 font-heading text-h1" data-reveal>
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-4 text-body text-fg-muted" data-reveal>
                {lead}
              </p>
            ) : null}

            {support ? <FaqSupportCard support={support} /> : null}
          </div>

          <div className="md:col-span-8" data-reveal>
            <Accordion items={items} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default SplitSidebar;
