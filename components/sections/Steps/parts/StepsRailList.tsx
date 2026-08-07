import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import { StepContent } from "./StepContent";
import type { StepItem } from "@/types/site";

interface StepsRailListProps {
  items: StepItem[];
  /** Сколько шагов в строке: 4 с md у rail, 2 с sm у stack. */
  columns: "md:grid-cols-4" | "sm:grid-cols-2";
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
    // gap-y, а не margin на <li>: у stack (md:grid-cols-2) при 4+ items
    // сетка переносится на вторую строку, а margin гасился на md ради
    // мобильной раскладки в один столбец — между рядами не оставалось
    // никакого зазора, и meta последнего шага в ряду утыкалась прямо в
    // верх карточки следующего ряда. gap-y работает одинаково что в
    // одну колонку на мобильном, что в несколько рядов на md+.
    <ol className={cn("mt-14 grid gap-x-gutter gap-y-10 md:mt-20 md:gap-y-14", columns)}>
      {items.map((item, index) => {
        const Icon = getIcon(item.icon);

        return (
          <li
            key={item.number}
            data-reveal
            style={revealDelay(index)}
            // flex-col h-full: meta должна стоять на одном уровне по
            // всему ряду, а не там, где кончился текст конкретной
            // карточки — mt-auto у StepContent прижимает её к низу
            // именно этой колонки высотой в весь ряд (grid растягивает
            // <li> по умолчанию), а не к низу самого текста.
            className="flex h-full flex-col border-t border-rule pt-7"
          >
            {Icon ? (
              <span className="icon-tile mb-4">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-6" />
              </span>
            ) : null}

            <span
              aria-hidden="true"
              className="tabular block font-display text-stat text-rule-strong"
            >
              {item.number}
            </span>

            <StepContent item={item} titleClassName="mt-5" metaClassName="mt-auto pt-6" />
          </li>
        );
      })}
    </ol>
  );
}

export default StepsRailList;
