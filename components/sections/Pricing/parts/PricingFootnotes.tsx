import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import type { PricingFootnote } from "@/types/site";

interface PricingFootnotesProps {
  items: PricingFootnote[];
  className?: string;
}

/**
 * Ряд карточек-примечаний под тарифами. Раньше жил только в variants/
 * Dark.tsx — вынесен сюда, чтобы `footnotes` можно было задать при любом
 * variant, а не только там, где для него случайно нашлось место в вёрстке.
 */
export function PricingFootnotes({ items, className }: PricingFootnotesProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {items.map((item, index) => {
        const Icon = getIcon(item.icon);
        return (
          <div
            key={item.title}
            data-reveal
            style={revealDelay(index)}
            className={cn(
              "rounded-card border p-6",
              item.tone === "accent"
                ? "border-y border-r border-y-rule border-r-rule border-l-4 border-l-accent"
                : "border-rule",
            )}
          >
            {Icon ? (
              <span className="icon-tile mb-3 inline-flex">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
              </span>
            ) : null}
            <p className="font-display text-h4">{item.title}</p>
            <p className="mt-1.5 text-small text-fg-muted">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PricingFootnotes;
