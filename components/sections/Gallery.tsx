import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import type { GallerySection } from "@/types/site";

/**
 * Единственный тёмный блок на странице. Кейсы верстаем как реестр
 * (строка на всю ширину), а не карточками — так помещается больше и
 * читается как список дел, а не как галерея. Акцента тут нет вообще.
 */
export function Gallery(props: GallerySection) {
  const {
    id,
    surface = "ink",
    number,
    eyebrow,
    title,
    lead,
    items,
    note,
  } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className="mt-14 md:mt-20">
          {/* Шапка реестра — только на десктопе, на мобильном роль берут подписи */}
          <div className="hidden border-b border-rule pb-4 md:grid md:grid-cols-12 md:gap-x-gutter">
            <span className="text-caption font-medium uppercase text-fg-muted md:col-span-3">
              Категория
            </span>
            <span className="text-caption font-medium uppercase text-fg-muted md:col-span-4">
              Ситуация
            </span>
            <span className="text-caption font-medium uppercase text-fg-muted md:col-span-4">
              Результат
            </span>
            <span className="text-right text-caption font-medium uppercase text-fg-muted md:col-span-1">
              Год
            </span>
          </div>

          <ul>
            {items.map((item, index) => (
              <li
                key={`${item.category}-${item.year}-${index}`}
                data-reveal
                style={revealDelay(index, 40)}
                className="grid gap-y-3 border-b border-rule py-7 md:grid-cols-12 md:gap-x-gutter md:py-6"
              >
                <p className="text-small font-medium md:col-span-3">
                  {item.category}
                </p>

                <p className="text-small text-fg-muted md:col-span-4">
                  <span className="mr-2 text-caption uppercase md:hidden">
                    Ситуация:
                  </span>
                  {item.problem}
                </p>

                <p className="text-small md:col-span-4">
                  <span className="mr-2 text-caption uppercase text-fg-muted md:hidden">
                    Результат:
                  </span>
                  {item.result}
                </p>

                <p className="tabular text-small text-fg-muted md:col-span-1 md:text-right">
                  {item.year}
                </p>
              </li>
            ))}
          </ul>

          {note ? (
            <p className="mt-8 max-w-[62ch] text-small text-fg-muted">{note}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default Gallery;
