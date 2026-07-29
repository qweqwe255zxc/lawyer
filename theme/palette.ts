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

/**
 * Шкала глубины — дубль --elevation-* из tokens.css (светлая тема).
 * Нужна там же, где и палитра: в рантайме без CSS (og-картинка,
 * письма из /api/contact), плюс как единственный список значений,
 * по которому видно всю систему теней не читая CSS.
 *
 * В самих компонентах эти строки не используются: там только утилиты
 * shadow-sm / shadow-md / shadow-lg / shadow-card-hover.
 */
export const elevation = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 20px -2px rgb(0 0 0 / 0.06)",
  lg: "0 10px 30px -4px rgb(0 0 0 / 0.08)",
  cardHover: "0 12px 32px -4px rgb(0 0 0 / 0.12)",
} as const;

/**
 * Шкала радиусов — дубль --radius-* из tokens.css.
 * `card` — не ступень шкалы, а выбранная пресетом ступень для
 * карточек и панелей (--radius-card): в базе это `md`.
 */
export const radius = {
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  card: "0.25rem",
} as const;
