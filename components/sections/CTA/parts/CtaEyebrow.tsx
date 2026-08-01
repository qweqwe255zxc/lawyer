import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface CtaEyebrowProps {
  eyebrow?: string;
  /** badge — пилюля (Badge soft); dot — подпись с акцентной точкой перед текстом. */
  variant?: "badge" | "dot";
  className?: string;
}

/**
 * Эйробров CTA — вынесен из тела, потому что читает его не один вариант:
 * badge нужен centered/boxed, dot — left/panel. CtaSection не деструктурирует
 * eyebrow в базовом band/quiet (см. CtaBody), но поле есть в SectionBase,
 * так что новые варианты используют его без правки типа.
 */
export function CtaEyebrow({ eyebrow, variant = "badge", className }: CtaEyebrowProps) {
  if (!eyebrow) return null;

  if (variant === "dot") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-caption font-medium uppercase text-fg-muted",
          className,
        )}
        data-reveal
      >
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-fg" />
        {eyebrow}
      </p>
    );
  }

  return (
    <div className={className} data-reveal>
      <Badge variant="soft" className="uppercase">
        {eyebrow}
      </Badge>
    </div>
  );
}

export default CtaEyebrow;
