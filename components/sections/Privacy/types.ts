import type { BrandConfig, ContactsConfig } from "@/types/site";

/**
 * Пропсы страницы политики конфиденциальности. Блок вне
 * site.config.sections: его рендерит app/privacy/page.tsx, а не
 * SectionRenderer, поэтому SectionBase (id, surface, variant) у него нет.
 */
export interface PrivacyProps {
  brand: BrandConfig;
  contacts: ContactsConfig;
  /** siteConfig.seo.siteUrl — в тексте показывается без схемы. */
  siteUrl: string;
}
