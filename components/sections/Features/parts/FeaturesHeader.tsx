import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface FeaturesHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  className?: string;
}

/**
 * Заголовок пилюлей по центру для cards-cta и bento — то, что обычный
 * `SectionHeader` не умеет (у него колонтитул всегда на левом поле).
 * Тот же приём, что и Stats/parts/StatsHeader.tsx и
 * Steps/parts/StepsHeader.tsx — компонент свой для секции, не общий.
 */
export function FeaturesHeader({ number, eyebrow, title, lead, className }: FeaturesHeaderProps) {
  if (!eyebrow && !title && !lead) return null;

  return (
    <div className={cn("mx-auto max-w-[46rem] text-center", className)}>
      {number ? (
        <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
          {number}
        </p>
      ) : null}

      {eyebrow ? (
        <div data-reveal>
          <Badge variant="soft" className="uppercase">
            {eyebrow}
          </Badge>
        </div>
      ) : null}

      {title ? (
        <h2 className="mx-auto mt-4 font-heading text-h1" data-reveal>
          {title}
        </h2>
      ) : null}

      {lead ? (
        <p className="mx-auto mt-5 max-w-[56ch] text-lead text-fg-muted" data-reveal>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export default FeaturesHeader;
