import type { Surface } from "@/types/site";

/**
 * До скролла хедер прозрачный и лежит поверх hero (см. .ui-header в
 * globals.css: background/blur/shadow включаются только под
 * [data-scrolled="true"]) — значит его текст должен читаться на цвете
 * hero, а не на своём обычном "paper". После скролла хедер получает
 * собственный непрозрачный фон и всегда возвращается к "paper".
 *
 * "ink" — единственная поверхность hero, где текст по умолчанию светлый
 * (data-surface="ink" переопределяет --surface-fg и т.д., см.
 * theme/tokens.css) — этого достаточно, чтобы хедер остался читаемым
 * поверх тёмного hero без ручной перекраски каждого варианта.
 */
export function headerSurface(
  heroSurface: Surface | undefined,
  scrolled: boolean,
): Surface {
  if (scrolled) return "paper";
  return heroSurface === "ink" ? "ink" : "paper";
}

/**
 * `transparentBeforeScroll: false` выключает наплывающий эффект — хедер
 * ведёт себя так, будто страница уже прокручена, с первого кадра.
 */
export function resolveScrolled(
  scrolled: boolean,
  transparentBeforeScroll: boolean | undefined,
): boolean {
  return transparentBeforeScroll === false ? true : scrolled;
}
