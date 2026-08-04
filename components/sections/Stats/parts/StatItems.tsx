import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import type { StatItem } from "@/types/site";

interface StatItemsProps {
  items: StatItem[];
  /** Классы ячейки: у полосы — разделители, у сетки их нет. */
  cellClassName?: (index: number) => string | undefined;
  /**
   * Выключка ячейки. Это не вкусовое оформление, а следствие раскладки:
   * в полосе ячейка центрирована (`text-center` в bandCell), и подпись
   * обязана центрироваться вместе с цифрой; в свободной сетке всё стоит
   * по левому краю.
   *
   * Раньше `mx-auto` на подписи стоял безусловно. В полосе он работал, а
   * в сетке центрировал БЛОК подписи под левой цифрой — и колонка читалась
   * кривой тем сильнее, чем короче подпись. Ширину блока держит
   * max-w-[22ch], поэтому без центрирования он просто прижат влево, как и
   * цифра над ним.
   */
  align?: "start" | "center";
}

/**
 * Сами цифры. Общие для всех раскладок: варианты отличаются сеткой вокруг
 * и наличием разделителей, а не разметкой значения и подписи.
 * Цифры всегда --color-fg, без акцента.
 */
export function StatItems({
  items,
  cellClassName,
  align = "start",
}: StatItemsProps) {
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
          <dd
            className={cn(
              "mt-3 max-w-[22ch] text-caption font-medium uppercase text-fg-muted",
              align === "center" && "mx-auto",
            )}
          >
            {item.label}
          </dd>
        </div>
      ))}
    </>
  );
}

export default StatItems;
