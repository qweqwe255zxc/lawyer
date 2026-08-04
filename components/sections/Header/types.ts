import type { CtaLink, HeaderVariant, Surface } from "@/types/site";

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
  /**
   * До скролла хедер прозрачный и лежит поверх hero. false — хедер сразу
   * держит непрозрачный фон/тень, как будто страницу уже прокрутили.
   * По умолчанию true. См. HeaderConfig в types/site.ts.
   */
  transparentBeforeScroll?: boolean;
  /**
   * Поверхность первой секции (hero). Хедер до скролла прозрачный и
   * лежит поверх hero — значит его текст должен читаться на ЦВЕТЕ hero,
   * а не на своём обычном "paper". "ink" hero → хедер до скролла берёт
   * data-surface="ink" (светлый текст), иначе остаётся "paper".
   */
  heroSurface?: Surface;
  /** См. HeaderConfig.hideOnScroll в types/site.ts. По умолчанию false. */
  hideOnScroll?: boolean;
}
