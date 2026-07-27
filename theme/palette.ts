/**
 * Дубль значений из theme/tokens.css — нужен там, где CSS-переменных
 * физически нет: favicon (SVG-роут), OG-картинка через next/og,
 * themeColor в <meta>.
 *
 * Важно: правишь палитру — меняй оба файла. Хексы больше нигде
 * в проекте быть не должно, в компонентах только токены и классы Tailwind.
 */
export const palette = {
  paper: "#f7f5f0",
  surface: "#ffffff",
  ink: "#1a1a18",
  inkMuted: "#55584f",
  rule: "#ddd9d0",
  accent: "#14452f",
} as const;

export const paletteDark = {
  paper: "#131512",
  ink: "#edeae3",
  accent: "#5ba47d",
} as const;
