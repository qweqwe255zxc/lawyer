import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { FeatureContent } from "../parts/FeatureContent";
import type { FeaturesSection } from "@/types/site";

/**
 * Карточки. Вариант по умолчанию в «Стандарте» и единственный, который
 * поддерживает photo на элементах: у карточки высота ячейки независимая,
 * а фото сидит в фиксированном aspect-ratio боксе.
 *
 * Card variant="framed" — «карточка по умолчанию»: её глубину задаёт
 * тариф, а не этот файл. Ставить тут elevated не нужно.
 */
export function Cards(props: FeaturesSection) {
  const {
    id,
    surface = "surface",
    // 3 в ряд по умолчанию: на 2 колонках карточка растягивается почти
    // на половину контейнера, и текст/пункты внутри читаются слишком
    // просторно по сравнению с остальными карточными секциями страницы.
    columns = 3,
    number,
    eyebrow,
    title,
    lead,
    items,
    iconShape,
  } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div
          className={cn(
            "mt-14 grid md:mt-20",
            columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
            "gap-gutter",
          )}
        >
          {items.map((item, index) => (
            <Card
              key={item.title}
              variant="framed"
              className="flex h-full flex-col"
            >
              <div
                className="flex flex-1 flex-col"
                data-reveal
                style={revealDelay(index % columns)}
              >
                <FeatureContent item={item} iconLayout="inline" />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Cards;
