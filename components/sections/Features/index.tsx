import { Bento } from "./variants/Bento";
import { Cards } from "./variants/Cards";
import { CardsCta } from "./variants/CardsCta";
import { GridLinks } from "./variants/GridLinks";
import { Table } from "./variants/Table";
import type { VariantMap } from "../variantMap";
import type { FeaturesSection } from "@/types/site";

/**
 * Роутер секции Features. Первая смена фона на странице (белая
 * поверхность вместо бумаги).
 *
 * Помимо выбора варианта роутер делает одну содержательную вещь: если
 * хотя бы у одного элемента задан photo, он ФОРСИРУЕТ Cards, что бы ни
 * стояло в конфиге — но только если стоял вариант БЕЗ карточки
 * (table/grid-links: там рамки рисует grid, и он не умеет выравнивать
 * фото произвольной высоты, сетка расползается). cards-cta и bento уже
 * держат каждый item в `Card`, туда photo встаёт без проблем. Правило
 * обязательное, см. docs/section-system.md, раздел 2.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  FeaturesSection,
  NonNullable<FeaturesSection["variant"]>
> = {
  table: Table,
  cards: Cards,
  "cards-cta": CardsCta,
  "grid-links": GridLinks,
  bento: Bento,
};

const GRID_ONLY: NonNullable<FeaturesSection["variant"]>[] = ["table", "grid-links"];

export function Features(props: FeaturesSection) {
  const variant = props.variant ?? "table";
  const hasPhoto = props.items.some((item) => item.photo);
  const needsForce = hasPhoto && GRID_ONLY.includes(variant);

  if (process.env.NODE_ENV !== "production" && needsForce) {
    console.warn(
      `[Features] Секция "${props.id}": variant="${variant}" не поддерживает photo — форсирован variant="cards".`,
    );
  }

  const Variant = needsForce ? Cards : (variants[variant] ?? Table);
  return <Variant {...props} />;
}

export default Features;
