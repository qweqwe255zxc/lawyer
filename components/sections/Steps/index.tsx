import { NumberedNodes } from "./variants/NumberedNodes";
import { Rail } from "./variants/Rail";
import { Stack } from "./variants/Stack";
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
};

export function Steps(props: StepsSection) {
  const Variant = variants[props.variant ?? "rail"] ?? Rail;
  return <Variant {...props} />;
}

export default Steps;
