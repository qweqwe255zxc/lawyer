import { Cards } from "./variants/Cards";
import { Table } from "./variants/Table";
import type { VariantMap } from "../variantMap";
import type { FeaturesSection } from "@/types/site";

/**
 * Роутер секции Features. Первая смена фона на странице (белая
 * поверхность вместо бумаги).
 *
 * Помимо выбора варианта роутер делает одну содержательную вещь: если
 * хотя бы у одного элемента задан photo, он ФОРСИРУЕТ Cards, что бы ни
 * стояло в конфиге. Причина не стилистическая — в табличной раскладке
 * рамки рисует grid, и он не умеет выравнивать фото произвольной высоты,
 * сетка расползается. Правило обязательное, см. docs/section-system.md,
 * раздел 2.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  FeaturesSection,
  NonNullable<FeaturesSection["variant"]>
> = {
  table: Table,
  cards: Cards,
};

export function Features(props: FeaturesSection) {
  const variant = props.variant ?? "table";
  const hasPhoto = props.items.some((item) => item.photo);

  if (process.env.NODE_ENV !== "production" && hasPhoto && variant === "table") {
    console.warn(
      `[Features] Секция "${props.id}": variant="table" не поддерживает photo — форсирован variant="cards".`,
    );
  }

  const Variant = hasPhoto ? Cards : (variants[variant] ?? Table);
  return <Variant {...props} />;
}

export default Features;
