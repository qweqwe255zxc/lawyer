import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { StepsHeader } from "../parts/StepsHeader";
import type { StepsSection } from "@/types/site";

/**
 * Горизонтальный таймлайн: линия под рядом круглых нод-иконок, заголовок
 * и описание центрированы под каждой нодой. Первая нода — с акцентным
 * кольцом: это статичный акцент «с чего всё начинается», а не состояние
 * прогресса (в данных нет понятия «текущий шаг»).
 */
export function Timeline(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StepsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-14 md:mb-20"
        />

        <ol className="relative grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden h-px bg-rule lg:block"
          />

          {items.map((item, index) => {
            const Icon = getIcon(item.icon);
            const isFirst = index === 0;

            return (
              <li
                key={item.number}
                data-reveal
                style={revealDelay(index)}
                className="relative text-center"
              >
                <span
                  className={cn(
                    "relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border bg-card",
                    isFirst ? "border-2 border-accent" : "border-rule",
                  )}
                >
                  {Icon ? (
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={cn("size-5", isFirst ? "text-accent" : "text-fg-muted")}
                    />
                  ) : null}
                </span>

                <h3 className="mt-4 font-display text-h4">
                  {item.number}. {item.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[26ch] text-small text-fg-muted">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default Timeline;
