"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { CtaLink } from "@/types/site";

interface MobileNavProps {
  nav: { label: string; href: string }[];
  actions: CtaLink[];
  menuOpen: boolean;
  closeMenu: () => void;
}

/**
 * Выезжающая мобильная панель, общая для всех дизайнов хедера: список
 * ссылок на линейках + кнопки во всю ширину. grid-template-rows вместо
 * hidden — панель ужимается до нуля с анимацией, а не пропадает
 * мгновенно; inert убирает её из фокуса и чтения экранным диктором,
 * пока она закрыта.
 */
export function MobileNav({ nav, actions, menuOpen, closeMenu }: MobileNavProps) {
  return (
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
  );
}

export default MobileNav;
