import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { StepsSection } from "@/types/site";

/**
 * Четыре шага на одной сплошной линейке. Номера — крупный сериф в цвете
 * линейки (не акцентом), чтобы не спорили с заголовками секции.
 */
export function Steps(props: StepsSection) {
  const {
    id,
    surface = "paper",
    variant = "rail",
    number,
    eyebrow,
    title,
    lead,
    items,
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

        <ol
          className={cn(
            "mt-14 grid gap-x-gutter md:mt-20",
            variant === "rail" ? "md:grid-cols-4" : "md:grid-cols-2",
          )}
        >
          {items.map((item, index) => (
            <li
              key={item.number}
              data-reveal
              style={revealDelay(index)}
              className={cn(
                "border-t border-rule pt-7",
                index > 0 && "mt-10 md:mt-0",
              )}
            >
              <span
                aria-hidden="true"
                className="tabular block font-display text-stat text-rule-strong"
              >
                {item.number}
              </span>

              <h3 className="mt-5 font-display text-h3">{item.title}</h3>
              <p className="mt-3 text-body text-fg-muted">{item.text}</p>

              {item.meta ? (
                <p className="mt-6 text-caption font-medium uppercase text-fg-muted">
                  {item.meta}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export default Steps;
