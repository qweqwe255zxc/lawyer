import type { ContactSection, ContactsConfig } from "@/types/site";

/**
 * Пропсы секции контактов. Отличается от остальных секций тем, что
 * contacts — не часть объекта секции в site.config.ts: их прокидывает
 * SectionRenderer через RenderContext, потому что это данные всего сайта,
 * а не конкретного блока.
 */
export type ContactFormProps = ContactSection & { contacts: ContactsConfig };
