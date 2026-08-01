import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import type { StatItem } from "@/types/site";

interface StatCardProps {
  item: StatItem;
  index: number;
  /** round — круглая плашка под иконкой (badge/playful); none — голая иконка (plain/dark). */
  tile?: "round" | "none";
  className?: string;
}

/**
 * Содержимое одной карточки-метрики: иконка, число (+ суффикс) и подпись,
 * плюс опциональное описание (text). Общий кусок для badge/playful/plain/
 * dark — эти четыре варианта отличаются только оправой карточки и тем,
 * есть ли у иконки круглая плашка, а не версткой самого числа.
 */
export function StatCard({ item, index, tile = "none", className }: StatCardProps) {
  const Icon = getIcon(item.icon);

  return (
    <div data-reveal style={revealDelay(index)} className={className}>
      {Icon ? (
        <div
          className={cn(
            "mb-4 flex items-center justify-center",
            tile === "round"
              ? "size-12 rounded-full bg-badge-soft text-accent"
              : "size-8 text-accent",
          )}
        >
          <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </div>
      ) : null}

      <dt className="tabular font-display text-stat">
        {item.value}
        {item.suffix ? <span className="text-accent">{item.suffix}</span> : null}
      </dt>

      <dd className="mt-3 text-caption font-medium uppercase text-fg-muted">
        {item.label}
      </dd>

      {item.text ? (
        <p className="mt-3 text-small text-fg-muted">{item.text}</p>
      ) : null}
    </div>
  );
}

export default StatCard;
