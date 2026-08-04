import type { Metadata } from "next";
import { Privacy } from "@/components/sections/Privacy";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Порядок обработки персональных данных пользователей сайта в соответствии с 152-ФЗ.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Страница-обёртка: metadata и данные из конфига. Разметка — в
 * components/sections/Privacy/variants/, текст политики — в
 * components/sections/Privacy/parts/legalBlocks.ts (заготовка под 152-ФЗ,
 * перед публикацией её должен вычитать юрист).
 */
export default function PrivacyPage() {
  const { brand, contacts, seo } = siteConfig;

  return <Privacy brand={brand} contacts={contacts} siteUrl={seo.siteUrl} />;
}
