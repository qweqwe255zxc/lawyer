import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { FooterSocialLink } from "@/types/site";

interface SocialLinksProps {
  items: FooterSocialLink[];
  className?: string;
}

/**
 * Ряд иконок-ссылок в футере, общий для нескольких вариантов (Bold,
 * Classic, Gradient, Glass, Centered, Split). Плашка — icon-tile, та же
 * роль, что у иконок Features: в «Экономе» это голая иконка без фона,
 * в «Стандарте» — мягкая подложка с радиусом.
 */
export function SocialLinks({ items, className }: SocialLinksProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        if (!Icon) return null;

        return (
          <li key={item.href}>
            <a
              href={item.href}
              aria-label={item.label}
              className="icon-tile flex size-9 items-center justify-center text-fg-muted transition-colors hover:text-fg"
            >
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
