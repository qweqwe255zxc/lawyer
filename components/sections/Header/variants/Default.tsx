"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
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

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              className="-mr-2 p-2 text-fg-muted transition-colors hover:text-fg lg:hidden"
            >
              <span className="relative block size-5">
                <Menu
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-200 ease-ui",
                    menuOpen ? "rotate-45 opacity-0" : "rotate-0 opacity-100",
                  )}
                />
                <X
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-200 ease-ui",
                    menuOpen ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Мобильное меню: grid-template-rows вместо hidden — панель ужимается
          до нуля с анимацией, а не пропадает мгновенно. inert убирает её
          из фокуса и чтения экранным диктором, пока она закрыта. */}
      <div
        id="mobile-nav"
        data-open={menuOpen}
        inert={!menuOpen}
        className={cn(
          "mobile-nav bg-bg lg:hidden",
          menuOpen ? "border-t border-rule" : "border-t border-transparent",
        )}
      >
        <div className="overflow-hidden">
          <Container>
            <nav aria-label="Мобильная навигация">
              <ul className="py-2">
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-rule last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-4 text-body text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="py-6 sm:hidden">
              {actions.map((action) => (
                <Button
                  key={action.href}
                  href={action.href}
                  variant={action.variant ?? "primary"}
                  full
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}

export default Default;
