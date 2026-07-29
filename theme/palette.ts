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
 * Шкала глубины — дубль --elevation-* из tokens.css (светлая тема,
 * тариф «Эконом»). Нужна там же, где и палитра: в рантайме без CSS
 * (og-картинка, письма из /api/contact), плюс как единственный список
 * значений, по которому видно всю систему теней не читая CSS.
 *
 * Значения намеренно почти невидимые: Эконом плоский. Настоящая
 * глубина живёт в elevationStandard ниже и включается пресетом.
 *
 * В самих компонентах эти строки не используются: там только классы
 * .ui-card* и токены --card-* / --elevation-*.
 */
export const elevation = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 20px -2px rgb(0 0 0 / 0.06)",
  lg: "0 10px 30px -4px rgb(0 0 0 / 0.08)",
  cardHover: "0 12px 32px -4px rgb(0 0 0 / 0.12)",
} as const;

/**
 * Дубль --elevation-* из блока [data-preset="standard"].
 * Две тени в каждой ступени: контактная + рассеянная. Одна плоская тень
 * на 6% альфы (как в elevation выше) на бумаге физически не читается —
 * именно поэтому «Стандарт» раньше выглядел как «Эконом».
 */
export const elevationStandard = {
  none: "none",
  sm: "0 1px 2px -1px rgb(24 22 18 / 0.10), 0 1px 3px 0 rgb(24 22 18 / 0.08)",
  md: "0 2px 6px -2px rgb(24 22 18 / 0.10), 0 12px 28px -8px rgb(24 22 18 / 0.16)",
  lg: "0 4px 10px -3px rgb(24 22 18 / 0.10), 0 24px 48px -14px rgb(24 22 18 / 0.22)",
  cardHover:
    "0 6px 14px -4px rgb(24 22 18 / 0.12), 0 32px 64px -18px rgb(24 22 18 / 0.28)",
} as const;

/**
 * Шкала радиусов — дубль --radius-* из tokens.css.
 * `card` / `control` / `media` / `pill` — не ступени шкалы, а РОЛИ:
 * какую ступень они означают, решает пресет тарифа. Здесь записаны
 * значения базы («Эконом»), в «Стандарте» это 16 / 12 / 16 / pill.
 */
export const radius = {
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
  card: "0.25rem",
  control: "0.125rem",
  media: "0.125rem",
  pill: "0.125rem",
} as const;
