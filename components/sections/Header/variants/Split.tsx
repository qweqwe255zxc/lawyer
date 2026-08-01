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
 * Навигация разбита на два кластера, вордмарк — сам по себе пункт
 * по центру между ними (отдельного знака слева нет). Три колонки
 * grid держат кластер по центру ровно, даже когда левая (пустая) и
 * правая (кнопка) зоны разной ширины. Середину делит nav.length
 * пополам — при нечётном числе пунктов правый кластер на один длиннее.
 */
export function Split({
  brandName,
  nav,
  actions,
  showThemeToggle,
}: HeaderProps) {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useHeaderState();
  const mid = Math.ceil(nav.length / 2);
  const left = nav.slice(0, mid);
  const right = nav.slice(mid);

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
        <div className="grid h-header grid-cols-[1fr_auto_1fr] items-center gap-6">
          <Link
            href="#hero"
            className="font-heading text-h3 font-bold whitespace-nowrap uppercase lg:hidden"
            onClick={closeMenu}
          >
            {brandName}
          </Link>

          <nav
            className="col-start-2 hidden items-center gap-8 lg:flex"
            aria-label="Основная навигация"
          >
            <ul className="flex items-center gap-8">
              {left.map((item, index) => (
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

            <Link
              href="#hero"
              className="font-heading text-h3 font-bold whitespace-nowrap uppercase"
            >
              {brandName}
            </Link>

            <ul className="flex items-center gap-8">
              {right.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-3">
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

export default Split;
