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
  const [active, setActive] = useState<string | null>(categories[0] ?? null);

  const visible = active ? items.filter((item) => item.category === active) : items;

  return (
    <div>
      {categories.length > 0 ? (
        <div className="mb-10 flex flex-wrap justify-center gap-2" data-reveal>
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

      <Accordion items={visible} />
    </div>
  );
}

export default CategoryFilter;
