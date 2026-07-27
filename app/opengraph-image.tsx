import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site.config";
import { palette } from "@/theme/palette";

export const alt = siteConfig.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

/**
 * Гружу шрифт с Google Fonts под нужный набор символов — Satori не умеет
 * системные шрифты, а тащить целиком кириллический Source Serif ради
 * одной картинки слишком жирно.
 */
async function loadFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl =
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}` +
      `&text=${encodeURIComponent(text)}`;

    // UA специально не передаю: с ним Google отдаёт woff2, а Satori
    // его не понимает, без UA приходит truetype
    const css = await fetch(cssUrl, { next: { revalidate: 604800 } }).then(
      (response) => response.text(),
    );

    const url =
      css.match(/src:\s*url\(([^)]+?)\)\s*format\('truetype'\)/)?.[1] ??
      css.match(/src:\s*url\(([^)]+?)\)/)?.[1];
    if (!url) return null;

    return await fetch(url, { next: { revalidate: 604800 } }).then((response) =>
      response.arrayBuffer(),
    );
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const { brand, seo, contacts } = siteConfig;

  const headline = seo.ogHeadline;
  const footerLine = `${contacts.phone} · ${seo.siteUrl.replace(/^https?:\/\//, "")}`;
  const kicker = `${brand.mark} · ${brand.name}`.toUpperCase();
  const eyebrow = brand.tagline.toUpperCase();

  const charset = Array.from(
    new Set(`${headline}${footerLine}${kicker}${eyebrow}`.split("")),
  ).join("");

  const [serif, sans] = await Promise.all([
    loadFont("Source Serif 4", 400, charset),
    loadFont("Golos Text", 500, charset),
  ]);

  const fonts = [
    serif && { name: "Serif", data: serif, weight: 400 as const, style: "normal" as const },
    sans && { name: "Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 500;
    style: "normal";
  }[];

  // если шрифты не подгрузились (например нет сети на билде) — отдаю
  // тот же макет в SVG, он рисуется шрифтами клиента и Satori не нужен
  if (fonts.length === 0) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="${palette.paper}"/>
      <line x1="80" y1="118" x2="1120" y2="118" stroke="${palette.rule}" stroke-width="1"/>
      <line x1="80" y1="512" x2="1120" y2="512" stroke="${palette.rule}" stroke-width="1"/>
      <text x="80" y="96" fill="${palette.inkMuted}" font-family="Arial, sans-serif" font-size="22" letter-spacing="1.8">${eyebrow}</text>
      <text x="80" y="300" fill="${palette.ink}" font-family="Georgia, serif" font-size="76">${headline}</text>
      <text x="80" y="566" fill="${palette.inkMuted}" font-family="Arial, sans-serif" font-size="24">${footerLine}</text>
    </svg>`;

    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
    });
  }

  const serifFamily = serif ? "Serif" : "Sans";
  const sansFamily = sans ? "Sans" : "Serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: palette.paper,
          color: palette.ink,
          padding: "72px 80px",
          fontFamily: sansFamily,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: `1px solid ${palette.rule}`,
            paddingBottom: 28,
            fontSize: 22,
            letterSpacing: 1.8,
            color: palette.inkMuted,
          }}
        >
          <span>{kicker}</span>
          <span>{eyebrow}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: serifFamily,
            fontSize: 82,
            lineHeight: 1.08,
            letterSpacing: -1.6,
            maxWidth: 940,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${palette.rule}`,
            paddingTop: 28,
            fontSize: 24,
            color: palette.inkMuted,
          }}
        >
          <span>{footerLine}</span>
          <span>{contacts.city}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
