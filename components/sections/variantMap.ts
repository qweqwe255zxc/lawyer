import type { ReactNode } from "react";

/**
 * Общие типы для роутеров секций (см. docs/section-system.md, раздел 7).
 *
 * Каждая секция в components/sections/ устроена одинаково:
 *
 *   <Название>/
 *     index.tsx          — роутер: по props.variant выбирает файл из variants/
 *     variants/<V>.tsx   — законченный вариант дизайна: рендерит секцию целиком
 *     parts/*.tsx        — куски разметки, общие для нескольких вариантов
 *
 * Компонент варианта принимает пропсы своей секции ЦЕЛИКОМ — тот же тип,
 * что приходит из site.config.ts. Так вариант можно скопировать в соседний
 * файл и переписать разметку, не трогая ни роутер, ни типы.
 */
export type SectionVariant<P> = (props: P) => ReactNode;

/**
 * Карта «имя варианта → компонент». Ключи обязаны покрывать весь union
 * variant из types/site.ts — забытый вариант не скомпилируется, а не
 * молча отрендерит пустоту.
 */
export type VariantMap<P, V extends string> = Record<V, SectionVariant<P>>;
