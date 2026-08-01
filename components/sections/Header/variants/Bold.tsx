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
 * Жирный вордмарк слева, навигация и кнопка сгруппированы одним блоком
 * справа (а не разнесены по трём зонам, как в Default) — так первый
 * пункт навигации визуально «продолжает» кнопку, а не теряется в
 * пустоте по центру.
 */
export function Bold({
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
            className="inline-flex items-center gap-2 font-heading text-h3 font-bold whitespace-nowrap"
            onClick={closeMenu}
          >
            <BrandMark mark={brandMark} alt={brandName} />
            <span className="hidden sm:inline">{brandName}</span>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:block" aria-label="Основная навигация">
              <ul className="flex items-center gap-8">
                {nav.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-small font-medium transition-colors hover:text-fg",
                        index === 0 ? "text-fg" : "text-fg-muted",
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
                    className="uppercase tracking-wide"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              <BurgerButton open={menuOpen} onClick={toggleMenu} />
            </div>
          </div>
        </div>
      </Container>

      <MobileNav nav={nav} actions={actions} menuOpen={menuOpen} closeMenu={closeMenu} />
    </header>
  );
}

export default Bold;
