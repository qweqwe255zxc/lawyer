import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { FooterSocialLink } from "@/types/site";

interface SocialLinksProps {
  items: FooterSocialLink[];
  className?: string;
}

/**
 * Ряд иконок-ссылок в футере, общий для нескольких вариантов (Bold,
 * Classic, Monogram, Centered, Split). Плашка — icon-tile, та же роль,
 * что у иконок Features: в «Экономе» это голая иконка без фона, в
 * «Стандарте» — мягкая подложка с радиусом. Размер плашки сознательно не
 * фиксирован (никакого size-9): icon-tile сама считает его из размера
 * иконки и своего паддинга — фиксированный бокс поверх этого раньше
 * обрезал паддинг и оставлял внутри непропорционально мелкую иконку.
 */
export function SocialLinks({ items, className }: SocialLinksProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-4", className)}>
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        if (!Icon) return null;

        return (
          <li key={item.href}>
            <a
              href={item.href}
              aria-label={item.label}
              className="icon-tile flex items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg"
            >
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
