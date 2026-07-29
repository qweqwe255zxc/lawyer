import { revealDelay } from "@/lib/reveal";
import type { StatItem } from "@/types/site";

interface StatItemsProps {
  items: StatItem[];
  /** Классы ячейки: у полосы — разделители, у сетки их нет. */
  cellClassName?: (index: number) => string | undefined;
}

/**
 * Сами цифры. Общие для всех раскладок: варианты отличаются сеткой вокруг
 * и наличием разделителей, а не разметкой значения и подписи.
 * Цифры всегда --color-fg, без акцента.
 */
export function StatItems({ items, cellClassName }: StatItemsProps) {
  return (
    <>
      {items.map((item, index) => (
        <div
          key={item.label}
          data-reveal
          style={revealDelay(index)}
          className={cellClassName?.(index)}
        >
          <dt className="tabular font-display text-stat">
            {item.value}
            {item.suffix ? (
              <span className="text-fg-muted">{item.suffix}</span>
            ) : null}
          </dt>
          <dd className="mx-auto mt-3 max-w-[22ch] text-caption font-medium uppercase text-fg-muted">
            {item.label}
          </dd>
        </div>
      ))}
    </>
  );
}

export default StatItems;
