import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface StatsHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** left — как в rows (заголовок над таблицей); center — остальные карточные варианты. */
  align?: "left" | "center";
  /** badge — эйброу пилюлей (Badge soft); plain — обычная подпись капслоком, как в rows. */
  eyebrowStyle?: "badge" | "plain";
  className?: string;
}

/**
 * Общая шапка для карточных вариантов Stats (badge/rows/bento/playful/
 * plain/dark) — эйброу/заголовок/лид, которые SectionBase объявляет, но
 * band/grid никогда не читали (см. parts/StatsNumber.tsx). У новых
 * вариантов есть чему это показать: без заголовка карточки с цифрами
 * выглядят вырванным из контекста блоком.
 */
export function StatsHeader({
  number,
  eyebrow,
  title,
  lead,
  align = "center",
  eyebrowStyle = "badge",
  className,
}: StatsHeaderProps) {
  if (!number && !eyebrow && !title && !lead) return null;

  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto max-w-[46rem] text-center", className)}>
      {number ? (
        <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
          {number}
        </p>
      ) : null}

      {eyebrow ? (
        eyebrowStyle === "badge" ? (
          <div data-reveal>
            <Badge variant="soft" className="uppercase">
              {eyebrow}
            </Badge>
          </div>
        ) : (
          <p className="text-caption font-medium uppercase text-accent" data-reveal>
            {eyebrow}
          </p>
        )
      ) : null}

      {title ? (
        <h2
          className={cn("mt-4 font-heading text-h1", centered && "mx-auto")}
          data-reveal
        >
          {title}
        </h2>
      ) : null}

      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-[56ch] text-lead text-fg-muted",
            centered && "mx-auto",
          )}
          data-reveal
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export default StatsHeader;
