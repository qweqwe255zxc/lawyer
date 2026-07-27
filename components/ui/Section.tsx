import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Surface } from "@/types/site";

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Контекст поверхности — переопределяет цветовые переменные для потомков. */
  surface?: Surface;
  /** lg — hero и CTA, sm — полоса статистики, none — секция сама решает. */
  spacing?: "default" | "lg" | "sm" | "none";
  /** Линейка во всю ширину сверху, базовый разделитель между секциями. */
  ruleTop?: boolean;
  className?: string;
}

const spacingMap = {
  default: "py-section",
  lg: "py-section-lg",
  sm: "py-section-sm",
  none: "",
} as const;

/**
 * Обёртка секции: задаёт поверхность, вертикальные отступы и
 * scroll-margin-top под sticky-хедер (data-section — селектор
 * для scroll-margin-top в globals.css). Больше ничего не делает.
 */
export function Section({
  id,
  children,
  surface = "paper",
  spacing = "default",
  ruleTop = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-section
      data-surface={surface}
      className={cn(
        "bg-bg text-fg",
        spacingMap[spacing],
        ruleTop && "border-t border-rule",
        className,
      )}
    >
      {children}
    </section>
  );
}

export default Section;
