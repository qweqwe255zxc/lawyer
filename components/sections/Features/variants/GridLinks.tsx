import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { FeaturesSection } from "@/types/site";

/** Ячейка табличной сетки: та же логика границ, что и в Table.tsx. */
function cellClass(index: number, columns: number): string {
  const parts = ["border-t border-rule py-9 md:py-11"];
  if (columns === 2) {
    parts.push(index % 2 === 1 ? "md:border-l md:pl-9" : "md:pr-9");
  } else {
    if (index % 3 !== 0) parts.push("md:border-l md:pl-9");
    parts.push("md:pr-9");
  }
  return parts.join(" ");
}

/**
 * Заголовок в две колонки (заголовок слева, лид справа) вместо
 * обычного `SectionHeader` с колонтитулом на поле — свой заголовок
 * только у этого варианта, поэтому он не вынесен в parts/. Дальше —
 * та же табличная сетка, что у Table, но со ссылкой-стрелкой в углу
 * ячейки вместо простого текста.
 */
export function GridLinks(props: FeaturesSection) {
  const { id, surface = "surface", columns = 2, eyebrow, title, lead, items } = props;
  const ArrowIcon = getIcon("arrowUpRight");

  return (
    <Section id={id} surface={surface}>
      <Container>
        {eyebrow || title || lead ? (
          <div className="grid gap-x-gutter gap-y-6 border-b border-rule pb-9 md:grid-cols-2 md:pb-11">
            <div>
              {eyebrow ? (
                <p className="text-caption font-medium uppercase text-accent" data-reveal>
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-3 font-heading text-h1" data-reveal>
                  {title}
                </h2>
              ) : null}
            </div>

            {lead ? (
              <p className="text-lead text-fg-muted md:self-end" data-reveal>
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className={cn("grid", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              style={revealDelay(index % columns)}
              className={cn("relative", cellClass(index, columns))}
            >
              {item.link ? (
                <Link
                  href={item.link.href}
                  aria-label={item.link.label}
                  className="absolute right-0 top-9 text-fg-muted transition-colors hover:text-fg md:top-11"
                >
                  {ArrowIcon ? (
                    <ArrowIcon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  ) : null}
                </Link>
              ) : null}

              <h3 className="font-display text-h3">{item.title}</h3>
              <p className="mt-3 max-w-[46ch] text-body text-fg-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default GridLinks;
