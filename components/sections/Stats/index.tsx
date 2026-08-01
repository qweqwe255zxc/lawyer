import { Band } from "./variants/Band";
import { Badge } from "./variants/Badge";
import { Bento } from "./variants/Bento";
import { Dark } from "./variants/Dark";
import { Grid } from "./variants/Grid";
import { Photo } from "./variants/Photo";
import { Plain } from "./variants/Plain";
import { Playful } from "./variants/Playful";
import { Rows } from "./variants/Rows";
import type { VariantMap } from "../variantMap";
import type { StatsSection } from "@/types/site";

/**
 * Роутер секции Stats.
 *
 * У этой секции две независимые оси: variant (раскладка цифр — сюда) и
 * containerVariant (подложка под ними — parts/container.ts, читают
 * только band/grid). Роутер выбирает только первую; подложку band/grid
 * собирают сами из общего хелпера.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  StatsSection,
  NonNullable<StatsSection["variant"]>
> = {
  band: Band,
  grid: Grid,
  badge: Badge,
  rows: Rows,
  bento: Bento,
  photo: Photo,
  playful: Playful,
  plain: Plain,
  dark: Dark,
};

export function Stats(props: StatsSection) {
  const resolved = props.variant ?? "band";

  if (process.env.NODE_ENV !== "production" && resolved === "photo" && !props.image) {
    console.warn(
      `[Stats] Секция "${props.id}": variant="photo" без image — фото занять нечем. ` +
        `Дайте image: "/images/..." или возьмите другой variant. См. docs/section-system.md.`,
    );
  }

  const Variant = variants[resolved] ?? Band;
  return <Variant {...props} />;
}

export default Stats;
