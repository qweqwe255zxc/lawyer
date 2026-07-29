import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardVariant =
  | "cell"
  | "framed"
  | "elevated"
  | "bordered-accent"
  | "plain";

interface CardProps {
  children: ReactNode;
  /**
   * cell            — ячейка табличной сетки: границы рисует родитель, у карточки их нет.
   * framed          — обведённая рамкой карточка на фоне своей секции (база, тариф «Эконом»).
   * elevated        — карточка на собственной поверхности с тенью (тариф «Стандарт»).
   * bordered-accent — та же поверхность, но вместо тени акцентная рамка.
   * plain           — только контент, без отступов и оформления.
   */
  variant?: CardVariant;
  /**
   * Подъём карточки при наведении. Включать только там, где карточка
   * целиком кликабельна или ведёт себя как интерактивный объект —
   * cursor-pointer в наборе, и на статичном блоке он врёт пользователю.
   */
  hoverEffect?: boolean;
  className?: string;
}

/**
 * Радиус у поднятых вариантов — rounded-card (--radius-card), одна ручка
 * на пресет ниши: Эконом оставляет документные 4px, «Стандарт IT» ставит
 * 16px, «Стандарт Premium» возвращает 2px. Карточка про конкретные
 * значения не знает.
 *
 * framed сознательно остался на bg-bg, а не на bg-card: это «карточка на
 * бумаге своей секции», как она и была свёрстана в базе. Собственную
 * поверхность (bg-card) получают только поднятые варианты.
 */
const variants: Record<CardVariant, string> = {
  cell: "",
  framed: "border border-rule rounded-doc bg-bg",
  elevated: "border border-rule/50 rounded-card bg-card shadow-md",
  "bordered-accent": "border border-accent-border rounded-card bg-card",
  plain: "",
};

export function Card({
  children,
  variant = "cell",
  hoverEffect = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        variants[variant],
        variant !== "plain" && "p-7 md:p-9",
        // motion-safe на сдвиге, а не на всём transition: при
        // prefers-reduced-motion тень всё равно меняется плавно,
        // а карточка не прыгает.
        hoverEffect &&
          "cursor-pointer transition-all duration-200 ease-ui hover:shadow-card-hover motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
