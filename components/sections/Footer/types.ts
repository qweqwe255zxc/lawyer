import type { BrandConfig, ContactsConfig, FooterConfig } from "@/types/site";

/**
 * Пропсы футера. «Не-секционный» блок в components/sections/: его
 * рендерит напрямую app/page.tsx, а не SectionRenderer, и в
 * site.config.sections его нет. Поэтому SectionBase (id, surface) у него
 * нет — данные приходят из brand / contacts / footer. `variant` не
 * отдельный проп, а поле внутри `footer` (FooterConfig.variant в
 * types/site.ts) — так весь конфиг футера остаётся одним объектом.
 */
export interface FooterProps {
  brand: BrandConfig;
  contacts: ContactsConfig;
  footer: FooterConfig;
  nav: { label: string; href: string }[];
}
