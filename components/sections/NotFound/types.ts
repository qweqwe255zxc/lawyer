import type { BrandConfig, ContactsConfig } from "@/types/site";

/**
 * Пропсы страницы 404. Как хедер и футер, это блок вне site.config.sections:
 * его рендерит app/not-found.tsx, а не SectionRenderer. Данные приходят
 * из brand / contacts, поэтому SectionBase (id, surface, variant) тут нет.
 */
export interface NotFoundProps {
  brand: BrandConfig;
  contacts: ContactsConfig;
}
