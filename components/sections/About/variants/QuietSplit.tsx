import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AboutMedia } from "../parts/AboutMedia";
import { AboutTextBlock } from "../parts/AboutTextBlock";
import type { AboutSection } from "@/types/site";

/** То же, что split-actions, но вторая кнопка — текстовая ссылка, не обводка. */
export function QuietSplit(props: AboutSection) {
  const { id, surface = "paper", number, eyebrow, title, text, actions, photo, photoAlt } = props;

  if (process.env.NODE_ENV !== "production" && !photo) {
    console.warn(
      `[About] Секция "${id}": variant="quiet-split" требует photo — вторая колонка не отрендерена.`,
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
            title={title}
            text={text}
            actions={actions}
            quietSecondary
          />
          {photo ? (
            <AboutMedia className="md:col-span-7" photo={photo} photoAlt={photoAlt} />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default QuietSplit;
