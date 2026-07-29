import { Band } from "./variants/Band";
import { Grid } from "./variants/Grid";
import type { VariantMap } from "../variantMap";
import type { StatsSection } from "@/types/site";

/**
 * Роутер секции Stats.
 *
 * У этой секции две независимые оси: variant (раскладка цифр — сюда) и
 * containerVariant (подложка под ними — parts/container.ts). Роутер
 * выбирает только первую; подложку каждый вариант собирает сам из общего
 * хелпера, поэтому любая раскладка сочетается с любой подложкой.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  StatsSection,
  NonNullable<StatsSection["variant"]>
> = {
  band: Band,
  grid: Grid,
};

export function Stats(props: StatsSection) {
  const Variant = variants[props.variant ?? "band"] ?? Band;
  return <Variant {...props} />;
}

export default Stats;
