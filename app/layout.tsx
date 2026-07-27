import type { Metadata, Viewport } from "next";
import { Golos_Text, Playfair_Display, Source_Serif_4 } from "next/font/google";
import { RevealRoot } from "@/components/ui/RevealRoot";
import { ThemeScript } from "@/components/ThemeScript";
import { YandexMetrika } from "@/components/YandexMetrika";
import { siteConfig } from "@/content/site.config";
import { buildMetadata } from "@/lib/seo";
import { palette, paletteDark } from "@/theme/palette";
import "./globals.css";

// Display-шрифт для заголовков, крупных цифр и цитат, с нормальной кириллицей.
// Body — кириллица-first гротеск. Больше шрифтов в проекте нет.
const sourceSerif = Source_Serif_4({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-source-serif",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-golos",
});

// Вторая серифная гарнитура — только для h1 и h2, для акцентной
// декоративной типографики (см. font-heading в theme/tokens.css).
const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
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
    <html
      lang="ru"
      className={`${sourceSerif.variable} ${golos.variable} ${playfair.variable}`}
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
