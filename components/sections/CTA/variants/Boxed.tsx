import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaEyebrow } from "../parts/CtaEyebrow";
import type { CtaSection } from "@/types/site";

/**
 * Контент в приподнятой карточке (Card variant="elevated") поверх
 * акцентной заливки секции — на своей поверхности карточка чуть темнее
 * фона (--surface-card в [data-surface="accent"]), поэтому читается как
 * отдельный, физический блок, а не просто ещё один абзац на цвете.
 */
export function Boxed(props: CtaSection) {
  const { id, surface = "accent", eyebrow, title, lead, actions = [], note } = props;

  return (
    <Section id={id} surface={surface} spacing="lg">
      <Container>
        <Card variant="elevated" className="mx-auto max-w-[56rem] text-center">
          <CtaEyebrow eyebrow={eyebrow} variant="badge" className="flex justify-center" />

          {title ? (
            <h2 className={`font-heading text-h1 ${eyebrow ? "mt-4" : ""}`} data-reveal>
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p className="mx-auto mt-5 max-w-[46ch] text-lead text-fg-muted" data-reveal>
              {lead}
            </p>
          ) : null}

          {actions.length > 0 ? (
            <div
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:items-baseline sm:justify-center"
              data-reveal
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  href={action.href}
                  variant={action.variant ?? "primary"}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}

          {note ? <p className="mt-5 text-small text-fg-muted">{note}</p> : null}
        </Card>
      </Container>
    </Section>
  );
}

export default Boxed;
