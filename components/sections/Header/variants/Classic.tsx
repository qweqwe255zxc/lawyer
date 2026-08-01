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
 * Корпоративный хедер: жирный вордмарк, навигация с активной ссылкой,
 * подчёркнутой сразу (не только на hover), и двухуровневые actions —
 * тихая текстовая ссылка (`variant: "quiet"` в конфиге) рядом с
 * акцентной кнопкой. Активный пункт — первый элемент nav, как и в
 * остальных хедерах шаблона (своего состояния активного роута нет).
 */
export function Classic({
  brandName,
  brandMark,
  nav,
  actions,
  showThemeToggle,
}: HeaderProps) {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useHeaderState();
  const quiet = actions.filter((action) => action.variant === "quiet");
  const buttons = actions.filter((action) => action.variant !== "quiet");

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
            className="inline-flex items-center gap-2 font-heading text-h3 font-bold whitespace-nowrap"
            onClick={closeMenu}
          >
            <BrandMark mark={brandMark} alt={brandName} />
            <span className="hidden sm:inline">{brandName}</span>
          </Link>

          <nav className="hidden lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-8">
              {nav.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "border-b-2 pb-1 text-small transition-colors hover:text-fg",
                      index === 0
                        ? "border-accent text-accent"
                        : "border-transparent text-fg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            {showThemeToggle ? <ThemeToggle /> : null}

            <div className="hidden items-center gap-5 sm:flex">
              {quiet.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="text-small text-fg-muted transition-colors hover:text-fg"
                >
                  {action.label}
                </Link>
              ))}

              {buttons.map((action) => (
                <Button key={action.href} href={action.href} variant="primary" size="sm">
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

export default Classic;
