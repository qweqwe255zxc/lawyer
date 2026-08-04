"use client";

import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/types/site";

/**
 * Пилюли-фильтр по item.category + отфильтрованный аккордеон. Настоящая
 * фильтрация (клиентский стейт), а не декоративный ряд табов: без этого
 * пилюли обещали бы переключение, которого нет.
 *
 * Если ни у одного item категория не задана — пилюли не рендерятся
 * вовсе, и показывается обычный аккордеон по всем вопросам.
 */
export function CategoryFilter({ items }: { items: FaqItem[] }) {
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[],
    [items],
  );
  // null — «Все». Раньше стартовало сразу с categories[0] и пилюли «Все»
  // не было вовсе: вопросы без category (поле опционально) становились
  // навсегда недостижимыми, как только у любого другого item была задана
  // категория.
  const [active, setActive] = useState<string | null>(null);

  const visible = active ? items.filter((item) => item.category === active) : items;

  return (
    <div>
      {categories.length > 0 ? (
        <div className="mb-10 flex flex-wrap justify-center gap-2" data-reveal>
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={cn(
              "rounded-pill px-4 py-2 text-small font-medium transition-colors",
              active === null
                ? "bg-btn-primary text-btn-primary-fg"
                : "bg-badge-soft text-badge-soft-fg hover:opacity-80",
            )}
          >
            Все
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={cn(
                "rounded-pill px-4 py-2 text-small font-medium transition-colors",
                active === category
                  ? "bg-btn-primary text-btn-primary-fg"
                  : "bg-badge-soft text-badge-soft-fg hover:opacity-80",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      {/* key сбрасывает открытые панели аккордеона при смене фильтра —
          иначе позиционный индекс открытой панели из одной категории
          совпадал бы с другим вопросом в новой и оставался раскрытым
          сам по себе. */}
      <Accordion key={active ?? "all"} items={visible} />
    </div>
  );
}

export default CategoryFilter;
