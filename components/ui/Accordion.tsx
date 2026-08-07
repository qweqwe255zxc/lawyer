"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getIcon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  question: string;
  answer: string;
  /** Плашка с иконкой слева от вопроса (FAQ variant="split-sidebar"/"categorized"). */
  icon?: IconName;
  /** Теги под ответом (FAQ variant="split-sidebar"). */
  tags?: string[];
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
 * берут подложка и тень). Раскрытый пункт подсвечивается цветом текста
 * (hover/active — text-accent), без вертикальной линии слева.
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

        const Icon = getIcon(item.icon);

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
                  "flex w-full cursor-pointer items-center justify-between gap-6 py-6 pl-5 text-left transition-colors md:pl-6",
                  isOpen ? "text-fg" : "text-fg hover:text-accent",
                )}
              >
                <span className="flex items-center gap-4">
                  {Icon ? (
                    <span className="icon-tile flex shrink-0 items-center justify-center">
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
                    </span>
                  ) : null}
                  <span className="font-display text-h3">{item.question}</span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-fg-muted transition-transform duration-200",
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
                <div className="pb-7 pl-5 pr-10 md:pl-6">
                  <p className="measure text-body text-fg-muted">{item.answer}</p>

                  {item.tags && item.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="soft">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : null}
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
