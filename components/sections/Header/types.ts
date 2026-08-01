import type { CtaLink, HeaderVariant } from "@/types/site";

/**
 * Пропсы хедера. Как и футер, это «не-секционный» блок: его рендерит
 * напрямую app/page.tsx, а не SectionRenderer, и в site.config.sections
 * его нет. Поэтому SectionBase (id, surface) у него тоже нет — данные
 * приходят из brand / header.actions / theme и из навигации, собранной
 * buildNav() по полю nav у секций. `variant` — единственное исключение,
 * читается из siteConfig.header.variant (см. types/site.ts).
 */
export interface HeaderProps {
  brandName: string;
  brandMark: string;
  nav: { label: string; href: string }[];
  actions: CtaLink[];
  showThemeToggle: boolean;
  variant?: HeaderVariant;
}
