import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FaqSupportCard } from "../parts/FaqSupportCard";
import type { FaqSection } from "@/types/site";

/**
 * Заголовок слева, аккордеон справа — настоящий split (в отличие от
 * variant="wide", который просто шире). Колонки не выравнены по высоте
 * специально: на длинном списке вопросов левая колонка короче правой, и
 * это нормально для сайдбара. Карточка `support` — под обеими колонками,
 * во всю ширину секции: она адресована ко ВСЕМ вопросам сразу, а не
 * только к тем, что успели поместиться в левую колонку.
 */
export function SplitSidebar(props: FaqSection) {
  const { id, surface = "surface", number, eyebrow, title, lead, support, items, iconShape } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-12">
          {/* min-w-0: без него длинное слово в заголовке распирало
              колонку 4/12 и выезжало за карточку с аккордеоном справа. */}
          <div className="min-w-0 md:col-span-4">
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
            {/* text-h2, не text-h1: в колонке 4/12 полный кегль h1 не
                оставлял слову шанса не перенестись — заголовок растягивался
                на 5-6 строк с разрывом посреди слов. */}
            {title ? (
              <h2 className="mt-3 font-heading text-h2 break-words" data-reveal>
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-4 text-body text-fg-muted" data-reveal>
                {lead}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-8" data-reveal>
            <Accordion items={items} />
          </div>
        </div>

        {support ? <FaqSupportCard support={support} className="mt-10 md:mt-14" /> : null}
      </Container>
    </Section>
  );
}

export default SplitSidebar;
