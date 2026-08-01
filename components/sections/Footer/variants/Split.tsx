import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "../parts/SocialLinks";
import type { FooterProps } from "../types";

/**
 * Навигация разбита на два кластера по бокам от вордмарка по центру —
 * та же идея, что и в Header/variants/Split.tsx. Нижняя строка:
 * копирайт слева, соцссылки справа.
 */
export function Split({ brand, footer, nav }: FooterProps) {
  const year = new Date().getFullYear();
  const mid = Math.ceil(nav.length / 2);
  const left = nav.slice(0, mid);
  const right = nav.slice(mid);

  return (
    <footer data-surface="paper" className="bg-bg text-fg">
      <div className="border-t border-rule py-14 md:py-16">
        <Container>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <nav className="hidden justify-self-end md:block" aria-label="Разделы сайта">
              <ul className="flex items-center gap-8">
                {left.map((item) => (
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

            <p className="col-start-2 justify-self-center font-heading text-h3 font-bold uppercase whitespace-nowrap">
              {brand.name}
            </p>

            <nav className="hidden justify-self-start md:block" aria-label="Разделы сайта">
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
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-rule pt-6 md:flex-row md:justify-between">
            <p className="tabular text-small text-fg-muted">
              © {year} {brand.legalName}
            </p>

            {footer.social ? <SocialLinks items={footer.social} /> : null}
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Split;
