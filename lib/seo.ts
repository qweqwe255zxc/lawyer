import type { Metadata } from "next";
import type { SiteConfig } from "@/types/site";

/** Собираю metadata целиком из конфига — руками ничего не дублирую. */
export function buildMetadata(config: SiteConfig): Metadata {
  const { seo, brand } = config;

  return {
    metadataBase: new URL(seo.siteUrl),
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: brand.name,
    authors: [{ name: brand.legalName }],
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: [{ url: "/favicon.ico" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: seo.siteUrl,
      siteName: brand.legalName,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false },
  };
}

/**
 * JSON-LD: Organization + LegalService (это более точный подтип LocalBusiness).
 * Один @graph, чтобы сущности могли ссылаться друг на друга через @id.
 */
export function buildJsonLd(config: SiteConfig) {
  const { seo, brand, contacts } = config;
  const orgId = `${seo.siteUrl}/#organization`;

  const address = {
    "@type": "PostalAddress",
    streetAddress: contacts.addressShort,
    addressLocality: contacts.city,
    postalCode: contacts.postalCode,
    addressCountry: contacts.country,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: brand.legalName,
        alternateName: brand.name,
        url: seo.siteUrl,
        description: brand.description,
        telephone: contacts.phone,
        email: contacts.email,
        address,
        sameAs: [contacts.telegramHref].filter(Boolean),
      },
      {
        "@type": "LegalService",
        "@id": `${seo.siteUrl}/#legalservice`,
        name: brand.legalName,
        parentOrganization: { "@id": orgId },
        url: seo.siteUrl,
        description: seo.description,
        telephone: contacts.phone,
        email: contacts.email,
        address,
        geo: {
          "@type": "GeoCoordinates",
          latitude: contacts.geo.lat,
          longitude: contacts.geo.lng,
        },
        openingHours: contacts.hoursSchema,
        priceRange: seo.priceRange,
        areaServed: { "@type": "City", name: contacts.city },
        image: `${seo.siteUrl}/opengraph-image`,
        knowsLanguage: ["ru"],
      },
    ],
  };
}

/** Навигация хедера — из секций, у которых задан nav. */
export function buildNav(config: SiteConfig) {
  return config.sections
    .filter((section) => Boolean(section.nav))
    .map((section) => ({ label: section.nav as string, href: `#${section.id}` }));
}
