import type { BrandConfig, ContactsConfig, FooterConfig } from "@/types/site";

/**
 * Пропсы футера. Единственный «не-секционный» блок в components/sections/:
 * его рендерит напрямую app/page.tsx, а не SectionRenderer, и в
 * site.config.sections его нет. Поэтому и SectionBase (id, surface,
 * variant) у него нет — данные приходят из brand / contacts / footer.
 */
export interface FooterProps {
  brand: BrandConfig;
  contacts: ContactsConfig;
  footer: FooterConfig;
  nav: { label: string; href: string }[];
}
