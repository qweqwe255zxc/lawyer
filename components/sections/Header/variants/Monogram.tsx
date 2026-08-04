"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { BurgerButton } from "../parts/BurgerButton";
import { headerSurface, resolveScrolled } from "../parts/headerSurface";
import { MobileNav } from "../parts/MobileNav";
import { useHeaderState } from "../parts/useHeaderState";
import { useNavOverflow } from "../parts/useNavOverflow";
import type { HeaderProps } from "../types";

/**
 * Знак — плашка с инициалом бренда на градиенте из двух акцентных
 * ступеней (`from-accent to-accent-active`, не сторонний hex): та же
 * идея, что и BrandMark с текстовым знаком, но в форме иконки для
 * брендов без готового лого-файла. Кнопка — с крупным радиусом
 * (rounded-control уже даёт это в «Стандарте»), без дополнительных
 * оверрайдов.
 */
export function Monogram({
  brandName,
  nav,
  actions,
  showThemeToggle,
  heroSurface,
  transparentBeforeScroll,
  hideOnScroll,
}: HeaderProps) {
  const { scrolled, hiddenByScroll, menuOpen, toggleMenu, closeMenu, activeHref } = useHeaderState(nav);
  const effectiveScrolled = resolveScrolled(scrolled, transparentBeforeScroll);
  const { ref: navRef, overflowing } = useNavOverflow<HTMLElement>();
  const initial = brandName.charAt(0).toUpperCase();

  return (
    <header
      data-surface={headerSurface(heroSurface, effectiveScrolled)}
      data-scrolled={effectiveScrolled}
      className={cn(
        "ui-header fixed inset-x-0 top-0 z-[var(--z-header)] text-fg",
        effectiveScrolled ? "border-b border-rule" : "border-b border-transparent",
        hideOnScroll && "transition-transform duration-300",
        hideOnScroll && hiddenByScroll && "-translate-y-full",
      )}
    >
      <Container>
        <div className="flex h-header items-center justify-between gap-6">
          <Link
            href="#hero"
            className="inline-flex shrink-0 items-center gap-2.5 font-heading text-h3 font-bold whitespace-nowrap"
            onClick={closeMenu}
          >
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-control bg-gradient-to-br from-accent to-accent-active text-body font-bold text-accent-fg"
            >
              {initial}
            </span>
            <span className="hidden sm:inline">{brandName}</span>
          </Link>

          <nav
            ref={navRef}
            className={cn(
              "no-scrollbar hidden min-w-0 overflow-x-auto lg:block",
              overflowing && "invisible pointer-events-none",
            )}
            aria-label="Основная навигация"
          >
            <ul className="flex items-center gap-5 xl:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-small whitespace-nowrap transition-colors hover:text-fg",
                      item.href === activeHref ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {showThemeToggle ? (
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
            ) : null}

            {actions[0] ? (
              <Button href={actions[0].href} variant={actions[0].variant ?? "primary"} size="sm">
                {actions[0].label}
              </Button>
            ) : null}

            {actions.length > 1 ? (
              <div className="hidden items-center gap-3 sm:flex">
                {actions.slice(1).map((action, index) => (
                  <Button
                    key={index}
                    href={action.href}
                    variant={action.variant ?? "primary"}
                    size="sm"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ) : null}

            <BurgerButton open={menuOpen} onClick={toggleMenu} forceVisible={overflowing} />
          </div>
        </div>
      </Container>

      <MobileNav
        nav={nav}
        actions={actions}
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        activeHref={activeHref}
      />
    </header>
  );
}

export default Monogram;
