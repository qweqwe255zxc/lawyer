import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaEyebrow } from "../parts/CtaEyebrow";
import type { CtaSection } from "@/types/site";

/**
 * Эйброу пилюлей, заголовок и кнопки по центру — в одну колонку, а не
 * в две (title слева/actions справа), как у band/quiet. Для призыва,
 * который должен читаться афишей, а не строкой с кнопкой в углу.
 */
export function Centered(props: CtaSection) {
  const { id, surface = "accent", eyebrow, title, lead, actions = [], note } = props;

  return (
    <Section id={id} surface={surface} spacing="lg">
      <Container>
        <div className="mx-auto max-w-[46rem] text-center">
          <CtaEyebrow eyebrow={eyebrow} variant="badge" className="flex justify-center" />

          {title ? (
            <h2 className={`font-heading text-h1 ${eyebrow ? "mt-4" : ""}`} data-reveal>
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p className="mx-auto mt-5 max-w-[48ch] text-lead text-fg-muted" data-reveal>
              {lead}
            </p>
          ) : null}

          {actions.length > 0 ? (
            <div
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              data-reveal
            >
              {actions.map((action) => (
                <Button
                  key={action.href}
                  href={action.href}
                  variant={action.variant ?? "primary"}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}

          {note ? <p className="mt-5 text-small text-fg-muted">{note}</p> : null}
        </div>
      </Container>
    </Section>
  );
}

export default Centered;
