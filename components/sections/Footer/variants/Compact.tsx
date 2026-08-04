import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { FooterProps } from "../types";

/**
 * Одна строка вместо многоколоночного подвала: знак и копирайт слева,
 * юридические ссылки справа. Верхняя граница акцентная (border-accent),
 * а не hairline — единственный вариант футера, где так.
 */
export function Compact({ brand, footer }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer data-surface="paper" className="bg-bg text-fg">
      <div className="border-t-2 border-accent">
        <Container>
          <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-heading text-h4 font-bold">{brand.name}</span>
              <span className="tabular text-small text-fg-muted">
                © {year} {brand.legalName}
              </span>
            </div>

            {footer.links.length > 0 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Compact;
