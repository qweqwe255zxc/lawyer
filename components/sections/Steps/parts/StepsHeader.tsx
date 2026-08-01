import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface StepsHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  align?: "left" | "center";
  eyebrowStyle?: "badge" | "plain";
  className?: string;
}

/**
 * Заголовок для карточных вариантов Steps (cards/cascade/timeline/split/
 * numbered-cards), у которых заголовок центрирован или требует пилюли —
 * то, что обычный `SectionHeader` не умеет (у него колонтитул всегда на
 * левом поле). Тот же приём, что и Stats/parts/StatsHeader.tsx — секции
 * разные, компонент здесь свой, не общий: раскладки шапки завязаны на
 * конкретную секцию.
 */
export function StepsHeader({
  number,
  eyebrow,
  title,
  lead,
  align = "center",
  eyebrowStyle = "badge",
  className,
}: StepsHeaderProps) {
  if (!eyebrow && !title && !lead) return null;

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
        <h2 className={cn("mt-4 font-heading text-h1", centered && "mx-auto")} data-reveal>
          {title}
        </h2>
      ) : null}

      {lead ? (
        <p
          className={cn("mt-5 max-w-[56ch] text-lead text-fg-muted", centered && "mx-auto")}
          data-reveal
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export default StepsHeader;
