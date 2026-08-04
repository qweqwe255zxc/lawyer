import Link from "next/link";
import type { FooterColumn } from "@/types/site";

interface FooterColumnsProps {
  columns: FooterColumn[];
}

/**
 * Сетка сгруппированных колонок ссылок (Bold/Classic/Monogram).
 * Число колонок приходит из данных (footer.columns.length), а не из
 * design-токена — поэтому grid-template-columns считается инлайном, а
 * не берётся из фиксированного набора Tailwind-классов md:grid-cols-N.
 */
export function FooterColumns({ columns }: FooterColumnsProps) {
  return (
    <div
      className="grid gap-x-gutter gap-y-8"
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
    >
      {columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <p className="text-caption font-medium uppercase text-fg-muted">
            {column.title}
          </p>
          <ul className="mt-4 grid gap-2.5">
            {column.links.map((link) => (
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
        </nav>
      ))}
    </div>
  );
}

export default FooterColumns;
