import type { CSSProperties } from "react";

/** Шаг задержки между соседними элементами группы, мс (значение из токенов). */
export const REVEAL_STAGGER = 60;

/**
 * Задержка появления элемента с data-reveal, через CSS-переменную —
 * длительность и кривая остаются в токенах, компонент задаёт только порядок.
 */
export function revealDelay(index: number, step = REVEAL_STAGGER): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
