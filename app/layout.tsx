import type { Metadata, Viewport } from "next";
import { Golos_Text, Onest, Unbounded } from "next/font/google";
import { RevealRoot } from "@/components/ui/RevealRoot";
import { ThemeScript } from "@/components/ThemeScript";
import { YandexMetrika } from "@/components/YandexMetrika";
import { siteConfig } from "@/content/site.config";
import { buildMetadata } from "@/lib/seo";
import { palette, paletteDark } from "@/theme/palette";
import "./globals.css";

// Display-шрифт для заголовков, крупных цифр и цитат, с нормальной кириллицей.
// Body — кириллица-first гротеск. IT/SaaS-ниша: современный гротеск вместо
// серифа (см. CLAUDE.md, §1.2) — Syne/Space Grotesk из таблицы там кириллицу
// не поддерживают вовсе, поэтому пара Unbounded/Onest.
const onest = Onest({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-onest",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-golos",
});

// Вторая гротескная гарнитура — только для h1 и h2, для акцентной
// декоративной типографики (см. font-heading в theme/tokens.css).
const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-unbounded",
});

export const metadata: Metadata = buildMetadata(siteConfig);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: palette.paper },
    { media: "(prefers-color-scheme: dark)", color: paletteDark.paper },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-preset — единственное место, откуда тариф оформления попадает
    // в CSS: блоки [data-preset=...] в theme/tokens.css переопределяют
    // ручки глубины, и вся страница разом становится «дорогой». Значение
    // серверное и статическое, поэтому вспышки смены темы тут нет.
    <html
      lang="ru"
      data-preset={siteConfig.theme.preset ?? "econom"}
      data-title-style={siteConfig.theme.titleStyle ?? "standard"}
      className={`${onest.variable} ${golos.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript theme={siteConfig.theme} />
      </head>
      <body>
        {children}
        <RevealRoot />
        <YandexMetrika id={siteConfig.analytics.yandexMetrikaId} />
      </body>
    </html>
  );
}
