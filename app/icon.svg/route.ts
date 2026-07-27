import { siteConfig } from "@/content/site.config";
import { palette } from "@/theme/palette";

export const dynamic = "force-static";

/**
 * Favicon из конфига: глиф theme.faviconGlyph на акцентном фоне.
 * Через SVG, не next/og — растровый рендер тащил бы кириллический
 * шрифт ради одной буквы 32×32, того не стоит.
 */
export function GET() {
  const glyph = siteConfig.theme.faviconGlyph;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="4" fill="${palette.accent}"/>
  <text x="32" y="33" fill="${palette.paper}" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="400" text-anchor="middle" dominant-baseline="central">${glyph}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
