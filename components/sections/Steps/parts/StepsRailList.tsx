import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { StepContent } from "./StepContent";
import type { StepItem } from "@/types/site";

interface StepsRailListProps {
  items: StepItem[];
  /** Сколько шагов в строке на md+: 4 у rail, 2 у stack. */
  columns: "md:grid-cols-4" | "md:grid-cols-2";
}

/**
 * Шаги на общей сплошной линейке. Номера — крупный сериф в цвете линейки
 * (не акцентом), чтобы не спорили с заголовками секции.
 *
 * Rail и Stack отличаются ровно одним классом сетки, поэтому список общий:
 * дублировать разметку ради разного числа колонок было бы двумя копиями,
 * которые разъедутся при первой же правке.
 */
export function StepsRailList({ items, columns }: StepsRailListProps) {
  return (
    <ol className={cn("mt-14 grid gap-x-gutter md:mt-20", columns)}>
      {items.map((item, index) => (
        <li
          key={item.number}
          data-reveal
          style={revealDelay(index)}
          className={cn("border-t border-rule pt-7", index > 0 && "mt-10 md:mt-0")}
        >
          <span
            aria-hidden="true"
            className="tabular block font-display text-stat text-rule-strong"
          >
            {item.number}
          </span>

          <StepContent item={item} titleClassName="mt-5" />
        </li>
      ))}
    </ol>
  );
}

export default StepsRailList;
