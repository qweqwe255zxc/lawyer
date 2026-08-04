"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveNav } from "./useActiveNav";

/**
 * Клиентская механика хедера, общая для любого его дизайна: признак
 * «страницу прокрутили» и состояние мобильного меню вместе с двумя
 * побочными эффектами открытого меню — блокировкой скролла страницы и
 * закрытием по Escape. Плюс активный пункт навигации (см. useActiveNav) —
 * если передан nav, иначе undefined и варианты падают обратно на
 * прежнее поведение (ничего не подсвечено).
 *
 * Живёт в parts/, а не в варианте: раскладка и оформление у второго
 * дизайна хедера будут свои, а это поведение — дословно то же самое
 * (тот же приём, что у ContactForm/parts/useContactForm.ts).
 */
export interface HeaderState {
  /** true, когда страницу прокрутили ниже 8px: по нему хедер отрывается от полосы. */
  scrolled: boolean;
  /**
   * true — хедер уезжает за верхний край: страницу докрутили вниз (после
   * --header-height) и последнее движение скролла было вниз. Скролл вверх
   * или возврат к самому верху страницы сразу сбрасывает в false. Само
   * поле есть всегда — использует его только вариант, которому передали
   * `hideOnScroll` (HeaderProps), остальные его просто не читают.
   */
  hiddenByScroll: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  /** href пункта nav, чья секция сейчас в верхней трети экрана. */
  activeHref?: string;
}

export function useHeaderState(nav?: { href: string }[]): HeaderState {
  const activeHref = useActiveNav(nav?.map((item) => item.href) ?? []);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // Ниже 96px хедер всегда виден — иначе первый же короткий свайп
      // вниз у самого верха страницы прятал хедер раньше, чем пользователь
      // успевал вообще заметить сам первый экран.
      if (y < 96) {
        setHiddenByScroll(false);
      } else if (y > lastScrollY.current) {
        setHiddenByScroll(true);
      } else if (y < lastScrollY.current) {
        setHiddenByScroll(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Открытое мобильное меню не должно уезжать вместе с хедером — иначе
  // пользователь останется на странице без способа его закрыть.
  useEffect(() => {
    if (menuOpen) setHiddenByScroll(false);
  }, [menuOpen]);

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

  useEffect(() => {
    // Бургер и мобильная панель — lg:hidden (см. BurgerButton/MobileNav).
    // Без этого эффекта расширение окна/поворот планшета за lg с открытым
    // меню прятало панель по CSS, но menuOpen оставался true — блокировка
    // скролла страницы (эффект выше) не снималась, а снять её было нечем:
    // сам бургер тоже скрыт.
    if (!menuOpen) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [menuOpen]);

  return {
    scrolled,
    hiddenByScroll,
    menuOpen,
    toggleMenu: () => setMenuOpen((open) => !open),
    closeMenu: () => setMenuOpen(false),
    activeHref,
  };
}
