import type { Metadata } from "next";
import { NotFound as NotFoundBlock } from "@/components/sections/NotFound";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

/**
 * Страница-обёртка: metadata и данные из конфига. Вся разметка — в
 * components/sections/NotFound/, чтобы дизайн 404 менялся тем же
 * способом, что и дизайн любой секции.
 */
export default function NotFound() {
  const { brand, contacts } = siteConfig;

  return <NotFoundBlock brand={brand} contacts={contacts} />;
}
