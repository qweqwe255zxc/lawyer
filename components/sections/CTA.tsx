import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { CtaSection } from "@/types/site";

/**
 * Единственный блок на странице с акцентной заливкой фона — специально
 * держим его в одном экземпляре. Внутри по минимуму: заголовок, строка,
 * кнопка, ничего лишнего.
 */
export function CTA(props: CtaSection) {
  const {
    id,
    surface = "accent",
    variant = "band",
    title,
    lead,
    actions = [],
    note,
  } = props;

  return (
    <Section
      id={id}
      surface={surface}
      spacing={variant === "band" ? "lg" : "default"}
    >
      <Container>
        <div className="grid gap-x-gutter gap-y-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7" data-reveal>
            {title ? (
              <h2 className="max-w-[18ch] font-heading text-h2">{title}</h2>
            ) : null}
            {lead ? (
              <p className="mt-6 max-w-[48ch] text-lead text-fg-muted">{lead}</p>
            ) : null}
          </div>

          {actions.length > 0 ? (
            <div className="md:col-span-5 md:justify-self-end" data-reveal>
              <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
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
              {note ? (
                <p className="mt-5 text-small text-fg-muted md:text-right">
                  {note}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default CTA;
