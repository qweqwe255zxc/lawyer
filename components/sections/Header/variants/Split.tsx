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
  heroSurface,
  transparentBeforeScroll,
  hideOnScroll,
}: HeaderProps) {
  const { scrolled, hiddenByScroll, menuOpen, toggleMenu, closeMenu, activeHref } = useHeaderState(nav);
  const effectiveScrolled = resolveScrolled(scrolled, transparentBeforeScroll);
  const { ref: navRef, overflowing } = useNavOverflow<HTMLElement>();
  const mid = Math.ceil(nav.length / 2);
  const left = nav.slice(0, mid);
  const right = nav.slice(mid);

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
        {/* auto/1fr/auto, а не 1fr/auto/1fr: крайние колонки — auto,
            то есть получают ровно столько места, сколько нужно их
            содержимому (слева — невидимый двойник правого блока, справа —
            сам блок, оба принудительно одинаковой ширины), и середина —
            единственный гибкий трек (minmax(0,1fr)), забирающий весь
            остаток. Это даёт сразу два свойства: (1) nav всегда ровно
            посередине, потому что обе соседних колонки правда равны, а не
            просто «честно делят» неравный остаток; (2) когда всему целиком
            не хватает места, ужимается именно nav (у него уже есть
            overflow-x-auto) — тогда nav.scrollWidth реально превышает
            nav.clientWidth и useNavOverflow корректно включает бургер.
            Раньше (auto — у nav) грид всегда давал nav его собственную
            ширину без ужатия, и хук ничего не мог засечь: при большом
            количестве пунктов меню кнопки в правой колонке просто
            наезжали на последний пункт nav, а не отдавали место бургеру. */}
        <div className="grid h-header grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6">
          <div className="col-start-1 flex items-center">
            <Link
              href="#hero"
              className={cn(
                "max-w-[16rem] truncate font-heading text-h3 font-bold uppercase",
                !overflowing && "lg:hidden",
              )}
              onClick={closeMenu}
            >
              {brandName}
            </Link>

            {/* Невидимый двойник правого блока (тема+кнопки+бургер) —
                без него левая колонка остаётся пустой, а правая тянет
                под свой контент, и middle-колонка (nav) съезжает влево
                от истинного центра шапки. С зеркалом обе крайних колонки
                получают одинаковую содержательную ширину, и minmax(0,1fr)
                делит остаток строго поровну. inert снимает эту копию из
                фокуса и озвучки целиком — она не должна быть достижима. */}
            {!overflowing ? (
              <div inert aria-hidden="true" className="invisible hidden items-center gap-3 lg:flex">
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
                        key={`mirror-${index}`}
                        href={action.href}
                        variant={action.variant ?? "primary"}
                        size="sm"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                ) : null}

                <BurgerButton open={false} onClick={() => {}} />
              </div>
            ) : null}
          </div>

          <nav
            ref={navRef}
            className={cn(
              "no-scrollbar col-start-2 hidden min-w-0 items-center gap-5 overflow-x-auto lg:flex xl:gap-8",
              overflowing && "invisible pointer-events-none",
            )}
            aria-label="Основная навигация"
          >
            <ul className="flex items-center gap-5 xl:gap-8">
              {left.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "border-b-2 pb-1 text-small whitespace-nowrap transition-colors hover:text-fg",
                      item.href === activeHref
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
              className="max-w-[16rem] shrink-0 truncate font-heading text-h3 font-bold uppercase"
            >
              {brandName}
            </Link>

            <ul className="flex items-center gap-5 xl:gap-8">
              {right.map((item) => (
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

          <div className="col-start-3 flex items-center justify-end gap-3">
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

export default Split;
