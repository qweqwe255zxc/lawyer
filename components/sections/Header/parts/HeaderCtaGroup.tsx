"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { CtaLink } from "@/types/site";

interface HeaderCtaGroupProps {
  actions: CtaLink[];
  className?: string;
}

/**
 * CTA-кнопки в баре хедера — общие для всех вариантов, без
 * вариант-специфичных оверрайдов формы (радиус/регистр — это .ui-button
 * и токены пресета, см. Button.tsx: хардкодить их там нельзя, иначе
 * кнопка перестаёт отличаться между тарифами). Один источник разметки
 * не даёт вариантам разъезжаться в стиле кнопки.
 *
 * Ниже sm видна только одна кнопка — с variant="primary" (или первая,
 * если primary среди actions нет), а не буквально actions[0]: порядок
 * в конфиге обычно "тихая → акцентная" для десктопа, а на самом узком
 * экране должна остаться самая заметная CTA, а не та, что просто
 * оказалась первой.
 */
export function HeaderCtaGroup({ actions, className }: HeaderCtaGroupProps) {
  if (actions.length === 0) return null;

  const primaryIndex = actions.findIndex((action) => (action.variant ?? "primary") === "primary");
  const soloIndex = primaryIndex >= 0 ? primaryIndex : 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {actions.map((action, index) => (
        <div key={index} className={index === soloIndex ? "shrink-0" : "hidden shrink-0 sm:block"}>
          <Button href={action.href} variant={action.variant ?? "primary"} size="sm">
            {action.label}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default HeaderCtaGroup;
