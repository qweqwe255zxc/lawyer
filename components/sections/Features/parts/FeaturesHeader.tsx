import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface FeaturesHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Заголовок пилюлей для cards-cta и bento — то, что обычный
 * `SectionHeader` не умеет (у него колонтитул всегда на левом поле).
 * Тот же приём, что и Steps/parts/StepsHeader.tsx и
 * Testimonials/parts/TestimonialsHeader.tsx — компонент свой для секции,
 * не общий. По центру — прежний единственный вид; align="left" читает
 * `SectionBase.headerAlign`, когда секция явно его переопределяет.
 */
export function FeaturesHeader({
  number,
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: FeaturesHeaderProps) {
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
        <div data-reveal>
          <Badge variant="soft" className="uppercase">
            {eyebrow}
          </Badge>
        </div>
      ) : null}

      {title ? (
        <h2 className={cn("mt-4 font-heading section-title-scale", centered && "mx-auto")} data-reveal>
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

export default FeaturesHeader;
