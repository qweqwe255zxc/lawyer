import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "soft" | "outline" | "solid";

interface BadgeProps {
  children: ReactNode;
  /**
   * soft    — мягкая плашка: акцент на 10%-подложке. Статусы («Выигран»,
   *           «В работе»), бейдж виджета в hero.
   * outline — строгая рамка + моноширинный капс: теги и коды, где важна
   *           не эмоция, а различимость (тариф «Стандарт Premium»).
   * solid   — непрозрачная акцентная заливка. Только для плашек, которые
   *           физически лежат НА ГРАНИЦЕ двух поверхностей (например,
   *           «MOST POPULAR» приподнят над верхним краем карточки и
   *           наполовину лежит на фоне секции) — там soft (10–16%-подложка)
   *           на светлом фоне секции почти не читается, а тут нужна плашка,
   *           видимая одинаково и на карточке, и рядом с ней.
   */
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Пара цветов у soft приходит из --badge-soft-* и переопределяется
 * поверхностью секции: на тёмном блоке (реестр кейсов) хвойный акцент
 * не читается, и плашка там строится на светлом тексте блока.
 * Компонент про это не знает — берёт bg-badge-soft / text-badge-soft-fg.
 *
 * Кегль — text-caption (13px + трекинг капса) из общей шкалы, а не
 * произвольные 12px: в шаблоне размеров шрифта вне токенов нет.
 *
 * Радиус — rounded-pill (--radius-pill), ручка пресета: документные 2px
 * в «Экономе», таблетка в «Стандарте». Плашка — самая заметная мелочь,
 * по которой тариф читается с первого взгляда, поэтому радиус тут не
 * хардкодится.
 */
const variants: Record<BadgeVariant, string> = {
  soft: "bg-badge-soft text-badge-soft-fg",
  outline: "border border-rule font-mono uppercase text-fg-muted",
  solid: "bg-accent text-accent-fg",
};

export function Badge({ children, variant = "soft", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-caption font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
