import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AboutMedia } from "../parts/AboutMedia";
import { AboutTextBlock } from "../parts/AboutTextBlock";
import type { AboutSection } from "@/types/site";

/**
 * Текст 5/12 с колонтитулом + кнопки, фото 7/12 в приподнятой карточке.
 * Колонтитул сам выбирает форму: `badge`/`badgeIcon` — пилюля, иначе —
 * обычная подпись с тире из `number`/`eyebrow` (см. AboutTextBlock).
 * `decorative` — акцентные пятна за фото, `frame` — оправа медиа-панели
 * (browser поверх фото читается как тёмная витрина продукта, особенно
 * вместе с surface="ink").
 *
 * Раньше это были четыре отдельных файла (split-actions/badge-split/
 * playful/dark), различавшихся только тем, какие из этих полей
 * прокидывались дальше и какой surface стоял по умолчанию — то есть
 * данными конфига, а не версткой. surface у секции и так своё поле
 * (SectionBase.surface): тёмный вариант — это split-actions с
 * surface="ink", а не отдельный variant.
 */
export function SplitActions(props: AboutSection) {
  const {
    id,
    surface = "paper",
    number,
    eyebrow,
    badge,
    badgeIcon,
    title,
    text,
    actions,
    photo,
    photoAlt,
    decorative = false,
    frame,
  } = props;

  if (process.env.NODE_ENV !== "production" && !photo) {
    console.warn(
      `[About] Секция "${id}": variant="split-actions" требует photo — вторая колонка не отрендерена.`,
    );
  }

  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-12 md:items-center">
          <AboutTextBlock
            className="md:col-span-5"
            number={number}
            eyebrow={eyebrow}
            badge={badge}
            badgeIcon={badgeIcon}
            title={title}
            text={text}
            actions={actions}
          />
          {photo ? (
            <AboutMedia
              className="md:col-span-7"
              photo={photo}
              photoAlt={photoAlt}
              decorative={decorative}
              frame={frame}
            />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default SplitActions;
