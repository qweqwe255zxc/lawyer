"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Разрешить несколько открытых пунктов одновременно. */
  multiple?: boolean;
  className?: string;
}

/**
 * Форма списка — ручки пресета (.ui-accordion / --accordion-* ):
 * в «Экономе» это список на линейках без рамок и фонов, в «Стандарте»
 * — стопка карточек с зазором (линейки при этом снимаются, их роль
 * берут подложка и тень). Раскрытый пункт в обоих случаях подсвечивается
 * 2px линией акцентного цвета слева — единственное цветное состояние.
 */
export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index);
      if (multiple) {
        return isOpen
          ? current.filter((i) => i !== index)
          : [...current, index];
      }
      return isOpen ? [] : [index];
    });
  };

  return (
    <div className={cn("ui-accordion", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className="ui-accordion-item">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 py-6 text-left transition-colors",
                  "border-l-2 pl-5 md:pl-6",
                  isOpen ? "border-accent" : "border-transparent hover:border-rule-strong",
                )}
              >
                <span className="font-display text-h3">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "mt-1 size-5 shrink-0 text-fg-muted transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>

            {/* Высота анимируется через grid-template-rows (0fr → 1fr) —
                панель остаётся в DOM и участвует в раскладке, а не
                выпрыгивает через display/hidden. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className="accordion-panel grid"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="border-l-2 border-transparent pb-7 pl-5 pr-10 md:pl-6">
                  <p className="measure text-body text-fg-muted">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
