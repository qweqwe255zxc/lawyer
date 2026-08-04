import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { AboutSection } from "@/types/site";

/**
 * Econom: только типография по центру, без фото и кнопок — тот же приём,
 * что у CTA/variants/Centered.tsx. Единственный вариант About, где
 * `photo` не читается вовсе.
 */
export function TypeOnly(props: AboutSection) {
  const { id, surface = "paper", number, eyebrow, title, text } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="mx-auto max-w-[46rem] text-center">
          {(number || eyebrow) && (
            <div className="flex items-center justify-center gap-3" data-reveal>
              {eyebrow ? (
                <span aria-hidden="true" className="h-px w-6 bg-rule-strong" />
              ) : null}
              {number ? (
                <span className="tabular text-caption font-medium uppercase text-fg-muted">
                  {number}
                </span>
              ) : null}
              {eyebrow ? (
                <span className="text-caption font-medium uppercase text-fg-muted">
                  {eyebrow}
                </span>
              ) : null}
            </div>
          )}

          {title ? (
            <h2 className="mx-auto mt-4 font-heading text-h1" data-reveal>
              {title}
            </h2>
          ) : null}

          <div className="mx-auto mt-5 max-w-[64ch] space-y-4" data-reveal>
            {text.map((paragraph) => (
              <p key={paragraph} className="text-body text-fg-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default TypeOnly;
