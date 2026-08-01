import { Cards } from "./variants/Cards";
import { Cascade } from "./variants/Cascade";
import { NumberedCards } from "./variants/NumberedCards";
import { NumberedNodes } from "./variants/NumberedNodes";
import { Rail } from "./variants/Rail";
import { Split } from "./variants/Split";
import { Stack } from "./variants/Stack";
import { Timeline } from "./variants/Timeline";
import type { VariantMap } from "../variantMap";
import type { StepsSection } from "@/types/site";

/**
 * Роутер секции Steps.
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  StepsSection,
  NonNullable<StepsSection["variant"]>
> = {
  rail: Rail,
  stack: Stack,
  "numbered-nodes": NumberedNodes,
  cards: Cards,
  cascade: Cascade,
  timeline: Timeline,
  split: Split,
  "numbered-cards": NumberedCards,
};

export function Steps(props: StepsSection) {
  const resolved = props.variant ?? "rail";

  if (process.env.NODE_ENV !== "production" && resolved === "split" && !props.image) {
    console.warn(
      `[Steps] Секция "${props.id}": variant="split" без image — фото занять нечем. ` +
        `Дайте image: "/images/..." или возьмите другой variant. См. docs/section-system.md.`,
    );
  }

  const Variant = variants[resolved] ?? Rail;
  return <Variant {...props} />;
}

export default Steps;
