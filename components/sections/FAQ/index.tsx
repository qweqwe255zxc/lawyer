import { Narrow } from "./variants/Narrow";
import { Split } from "./variants/Split";
import type { VariantMap } from "../variantMap";
import type { FaqSection } from "@/types/site";

/**
 * Роутер секции FAQ.
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<FaqSection, NonNullable<FaqSection["variant"]>> = {
  narrow: Narrow,
  split: Split,
};

export function FAQ(props: FaqSection) {
  const Variant = variants[props.variant ?? "narrow"] ?? Narrow;
  return <Variant {...props} />;
}

export default FAQ;
