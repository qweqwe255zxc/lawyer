"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { BurgerButton } from "../parts/BurgerButton";
import { MobileNav } from "../parts/MobileNav";
import { useHeaderState } from "../parts/useHeaderState";
import type { HeaderProps } from "../types";

/**
 * Стеклянная подложка (`--header-bg` + `--header-blur`) в «Стандарте»
 * и так включена всегда через `.ui-header` — отличие этого варианта
 * только в тени: она у `.ui-header[data-scrolled="true"]`, а здесь
 * шапка обязана выглядеть приподнятой с первого кадра, а не после
 * скролла, поэтому `data-scrolled` держим включённым безусловно.
 * Реальный скролл всё равно нужен — от него зависит нижняя линейка.
 */
export function Glass({
  brandName,
  nav,
  actions,
  showThemeToggle,
}: HeaderProps) {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useHeaderState();
  const initial = brandName.charAt(0).toUpperCase();

  return (
    <header
      data-surface="paper"
      data-scrolled="true"
      className={cn(
        "ui-header sticky top-0 z-[var(--z-header)] text-fg",
        scrolled ? "border-b border-rule" : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-header items-center justify-between gap-6">
          <Link
            href="#hero"
            className="inline-flex items-center gap-2.5 font-heading text-h3 font-bold whitespace-nowrap"
            onClick={closeMenu}
          >
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-control bg-accent text-body font-bold text-accent-fg"
            >
              {initial}
            </span>
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
                        ? "border-accent text-fg"
                        : "border-transparent text-fg-muted",
                    )}
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
                  className="rounded-pill"
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

export default Glass;
