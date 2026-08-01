"use client";

import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface BurgerButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Кнопка бургера, общая для всех дизайнов хедера: разметка и переход
 * между иконками Menu/X дословно одинаковы во всех вариантах, меняется
 * только то, где кнопка стоит в макете (это решает variant, не этот файл).
 */
export function BurgerButton({ open, onClick, className }: BurgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? "Закрыть меню" : "Открыть меню"}
      className={cn(
        "-mr-2 p-2 text-fg-muted transition-colors hover:text-fg lg:hidden",
        className,
      )}
    >
      <span className="relative block size-5">
        <Menu
          aria-hidden="true"
          className={cn(
            "absolute inset-0 size-5 transition-all duration-200 ease-ui",
            open ? "rotate-45 opacity-0" : "rotate-0 opacity-100",
          )}
        />
        <X
          aria-hidden="true"
          className={cn(
            "absolute inset-0 size-5 transition-all duration-200 ease-ui",
            open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
          )}
        />
      </span>
    </button>
  );
}

export default BurgerButton;
