import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  /**
   * cell   — ячейка табличной сетки: границы рисует родитель, у карточки их нет.
   * framed — обведённая рамкой карточка (используется в Pricing).
   * plain  — только отступы.
   */
  variant?: "cell" | "framed" | "plain";
  className?: string;
}

/** Теней нигде не используем — разделяем линейками и разницей белизны фона. */
export function Card({ children, variant = "cell", className }: CardProps) {
  return (
    <div
      className={cn(
        variant === "framed" && "border border-rule rounded-doc bg-bg",
        variant !== "plain" && "p-7 md:p-9",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
