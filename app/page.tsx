import { Header } from "@/components/Header";
import { SectionRenderer } from "@/components/SectionRenderer";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/content/site.config";
import { buildJsonLd, buildNav } from "@/lib/seo";

export default function HomePage() {
  const { brand, contacts, theme, header, footer, sections } = siteConfig;
  const nav = buildNav(siteConfig);
  const jsonLd = buildJsonLd(siteConfig);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header
        brandName={brand.name}
        brandMark={brand.mark}
        nav={nav}
        actions={header.actions}
        showThemeToggle={theme.darkModeToggle}
      />

      <main id="main">
        <SectionRenderer sections={sections} context={{ contacts }} />
      </main>

      <Footer brand={brand} contacts={contacts} footer={footer} nav={nav} />
    </>
  );
}
