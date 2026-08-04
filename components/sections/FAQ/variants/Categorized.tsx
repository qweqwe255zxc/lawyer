import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CategoryFilter } from "../parts/CategoryFilter";
import { FaqSupportCard } from "../parts/FaqSupportCard";
import type { FaqSection } from "@/types/site";

/**
 * Заголовок пилюлей по центру, фильтр по `item.category` (настоящий,
 * не декоративный — см. parts/CategoryFilter.tsx), аккордеон карточками
 * с иконкой у вопроса (item.icon читает сам Accordion).
 */
export function Categorized(props: FaqSection) {
  const { id, surface = "surface", number, eyebrow, title, lead, items, support, iconShape } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      {/* width="page", а не "narrow": вопросам с иконкой и плашками
          категорий 760px тесноваты. Заголовок сам себе держит узкую
          колонку через max-w-[46rem] ниже, а вопросам достаётся
          отдельная, более широкая колонка (max-w-[54rem]). */}
      <Container width="page">
        <div className="mx-auto max-w-[46rem] text-center">
          {number ? (
            <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
              {number}
            </p>
          ) : null}

          {eyebrow ? (
            <div data-reveal>
              <Badge variant="soft" className="uppercase">
                {eyebrow}
              </Badge>
            </div>
          ) : null}

          {title ? (
            <h2 className="mx-auto mt-4 font-heading text-h1" data-reveal>
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p className="mx-auto mt-4 max-w-[56ch] text-lead text-fg-muted" data-reveal>
              {lead}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-12 max-w-[54rem] md:mt-16">
          <CategoryFilter items={items} />

          {support ? (
            <FaqSupportCard support={support} className="mt-10 md:mt-14" />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default Categorized;
