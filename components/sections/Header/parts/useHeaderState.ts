"use client";

import { useEffect, useState } from "react";

/**
 * Клиентская механика хедера, общая для любого его дизайна: признак
 * «страницу прокрутили» и состояние мобильного меню вместе с двумя
 * побочными эффектами открытого меню — блокировкой скролла страницы и
 * закрытием по Escape.
 *
 * Живёт в parts/, а не в варианте: раскладка и оформление у второго
 * дизайна хедера будут свои, а это поведение — дословно то же самое
 * (тот же приём, что у ContactForm/parts/useContactForm.ts).
 */
export interface HeaderState {
  /** true, когда страницу прокрутили ниже 8px: по нему хедер отрывается от полосы. */
  scrolled: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export function useHeaderState(): HeaderState {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return {
    scrolled,
    menuOpen,
    toggleMenu: () => setMenuOpen((open) => !open),
    closeMenu: () => setMenuOpen(false),
  };
}
