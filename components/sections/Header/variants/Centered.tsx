"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { headerSurface } from "../parts/headerSurface";
import { useHeaderState } from "../parts/useHeaderState";
import type { HeaderProps } from "../types";

/**
 * Минималистичный хедер в две строки: знак и навигация центрированы,
 * без кнопки и без бургера — список ссылок короткий и просто переносится
 * (`flex-wrap`), отдельного мобильного состояния этому дизайну не нужно.
 * Первый пункт навигации — активный (жирный), как и в остальных хедерах
 * шаблона.
 */
export function Centered({
  brandName,
  nav,
  showThemeToggle,
  heroSurface,
  hideOnScroll,
}: HeaderProps) {
  const { scrolled, hiddenByScroll, activeHref } = useHeaderState(nav);

  return (
    <header
      data-surface={headerSurface(heroSurface, scrolled)}
      data-scrolled={scrolled}
      className={cn(
        "ui-header fixed inset-x-0 top-0 z-[var(--z-header)] text-fg",
        scrolled ? "border-b border-rule" : "border-b border-transparent",
        hideOnScroll && "transition-transform duration-300",
        hideOnScroll && hiddenByScroll && "-translate-y-full",
      )}
    >
      <Container>
        <div className="relative flex flex-col items-center gap-4 py-6">
          {showThemeToggle ? (
            <div className="absolute top-6 right-0">
              <ThemeToggle />
            </div>
          ) : null}

          <Link href="#hero" className="font-heading text-h3 tracking-wide">
            {brandName}
          </Link>

          <nav aria-label="Основная навигация">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-caption font-medium tracking-wide uppercase transition-colors hover:text-fg",
                      item.href === activeHref ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Centered;
