"use client";

import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { BurgerButton } from "../parts/BurgerButton";
import { MobileNav } from "../parts/MobileNav";
import { useHeaderState } from "../parts/useHeaderState";
import type { HeaderProps } from "../types";

/**
 * Sticky-хедер в одну строку: знак бренда слева, навигация по центру,
 * кнопка справа, на узких экранах — бургер и выезжающая панель.
 *
 * Чем он отрывается от страницы при скролле, решает пресет тарифа
 * (класс .ui-header + --header-shadow / --header-bg / --header-blur):
 * в «Экономе» это по-прежнему только тонкая линия снизу, теней нет;
 * в «Стандарте» добавляются полупрозрачный фон, backdrop-blur и тень.
 * Якорные ссылки не заезжают под хедер благодаря scroll-margin-top на
 * секциях (см. globals.css).
 */
export function Default({
  brandName,
  brandMark,
  nav,
  actions,
  showThemeToggle,
}: HeaderProps) {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useHeaderState();

  return (
    <header
      data-surface="paper"
      data-scrolled={scrolled}
      className={cn(
        "ui-header sticky top-0 z-[var(--z-header)] text-fg",
        scrolled ? "border-b border-rule" : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-header items-center justify-between gap-6">
          <Link
            href="#hero"
            className="inline-flex items-center gap-2 font-display text-h3 whitespace-nowrap"
            onClick={closeMenu}
          >
            <BrandMark mark={brandMark} alt={brandName} />
            <span className="hidden sm:inline">{brandName}</span>
          </Link>

          <nav className="hidden lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="border-b-2 border-transparent pb-1 text-small text-fg-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {showThemeToggle ? <ThemeToggle /> : null}

            <div className="hidden sm:block">
              {actions.map((action) => (
                <Button
                  key={action.href}
                  href={action.href}
                  variant={action.variant ?? "primary"}
                  size="sm"
                >
                  {action.label}
                </Button>
              ))}
            </div>

            <BurgerButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </Container>

      <MobileNav nav={nav} actions={actions} menuOpen={menuOpen} closeMenu={closeMenu} />
    </header>
  );
}

export default Default;
