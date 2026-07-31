import type { CtaLink } from "@/types/site";

/**
 * Пропсы хедера. Как и футер, это «не-секционный» блок: его рендерит
 * напрямую app/page.tsx, а не SectionRenderer, и в site.config.sections
 * его нет. Поэтому SectionBase (id, surface, variant) у него тоже нет —
 * данные приходят из brand / header.actions / theme и из навигации,
 * собранной buildNav() по полю nav у секций.
 */
export interface HeaderProps {
  brandName: string;
  brandMark: string;
  nav: { label: string; href: string }[];
  actions: CtaLink[];
  showThemeToggle: boolean;
}
