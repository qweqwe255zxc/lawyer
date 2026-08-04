"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "light" | "dark";

/**
 * Показывается только если theme.darkModeToggle === true.
 * data-theme на <html> уже выставлен анти-мигание скриптом — тут просто
 * читаем его, а не назначаем заново.
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setMode(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // в приватном режиме localStorage может кинуть ошибку — тема просто не сохранится
    }
    setMode(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mode === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
      }
      className="shrink-0 cursor-pointer p-2 text-fg-muted transition-colors hover:text-fg"
    >
      {mode === "dark" ? (
        <Sun aria-hidden="true" className="size-5" />
      ) : (
        <Moon aria-hidden="true" className="size-5" />
      )}
    </button>
  );
}

export default ThemeToggle;
