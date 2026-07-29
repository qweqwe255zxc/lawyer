import { Cards } from "./variants/Cards";
import { Columns } from "./variants/Columns";
import { Rows } from "./variants/Rows";
import type { VariantMap } from "../variantMap";
import type { TeamSection } from "@/types/site";

/**
 * Роутер секции Team.
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<TeamSection, NonNullable<TeamSection["variant"]>> = {
  columns: Columns,
  rows: Rows,
  cards: Cards,
};

export function Team(props: TeamSection) {
  const Variant = variants[props.variant ?? "columns"] ?? Columns;
  return <Variant {...props} />;
}

export default Team;
