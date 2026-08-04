import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { TestimonialBody } from "../parts/TestimonialBody";
import type { TestimonialsSection } from "@/types/site";

/**
 * Крупные серифные цитаты по одной в ряд, разделённые линейками: автор
 * слева в 12-колоночной сетке, цитата справа. Без кавычек-картинок, без
 * аватарок, без карточек. Вариант по умолчанию в «Экономе».
 *
 * Если title не задан — секция идёт без собственного вертикального ритма
 * (spacing="none") и добирает нижний отступ через pb-section: так она
 * прижимается к предыдущей секции и читается её продолжением.
 */
export function Quotes(props: TestimonialsSection) {
  const {
    id,
    surface = "paper",
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  return (
    <Section id={id} surface={surface} spacing={title ? "default" : "none"}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className={cn(title ? "mt-14 md:mt-20" : "pb-section")}>
          {items.map((item, index) => (
            <figure
              key={`${item.author}-${index}`}
              data-reveal
              style={revealDelay(index)}
              className="grid gap-x-gutter gap-y-5 border-t border-rule py-8 pt-8 md:grid-cols-12"
            >
              <TestimonialBody
                item={item}
                quoteClassName="text-quote md:col-span-8 md:col-start-4"
                captionClassName="md:col-span-3 md:col-start-1 md:row-start-1"
              />
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Quotes;
