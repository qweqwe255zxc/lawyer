import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CtaEyebrow } from "../parts/CtaEyebrow";
import type { CtaSection } from "@/types/site";

/**
 * Всё по левому краю в одну колонку: эйброу точкой, заголовок, лид,
 * кнопки строкой под ним. Без второй колонки под actions — для страниц,
 * где призыв ближе к обычному текстовому блоку, чем к афише.
 */
export function Left(props: CtaSection) {
  const { id, surface = "accent", eyebrow, title, lead, actions = [], note } = props;

  return (
    <Section id={id} surface={surface} spacing="lg">
      <Container>
        <div className="max-w-[42rem]">
          <CtaEyebrow eyebrow={eyebrow} variant="dot" />

          {title ? (
            <h2 className={`max-w-[18ch] font-heading text-h1 ${eyebrow ? "mt-4" : ""}`} data-reveal>
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p className="mt-5 max-w-[48ch] text-lead text-fg-muted" data-reveal>
              {lead}
            </p>
          ) : null}

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
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

export default Left;
