import { Cards } from "./variants/Cards";
import { Table } from "./variants/Table";
import type { VariantMap } from "../variantMap";
import type { PricingSection } from "@/types/site";

/**
 * Роутер секции Pricing.
 *
 * Не используется на текущем лендинге (нет в site.config.sections) —
 * оставлена про запас для других проектов на этом шаблоне. Это не
 * забытый мёртвый код.
 *
 * Как и Features, роутер ФОРСИРУЕТ Cards, если хотя бы у одного плана
 * задан photo: табличная сетка с border-top/border-l не умеет выравнивать
 * фото произвольной высоты. См. docs/section-system.md, раздел 2.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  PricingSection,
  NonNullable<PricingSection["variant"]>
> = {
  table: Table,
  cards: Cards,
};

export function Pricing(props: PricingSection) {
  const variant = props.variant ?? "table";
  const hasPhoto = props.items.some((plan) => plan.photo);

  if (process.env.NODE_ENV !== "production" && hasPhoto && variant === "table") {
    console.warn(
      `[Pricing] Секция "${props.id}": variant="table" не поддерживает photo — форсирован variant="cards".`,
    );
  }

  const Variant = hasPhoto ? Cards : (variants[variant] ?? Table);
  return <Variant {...props} />;
}

export default Pricing;
