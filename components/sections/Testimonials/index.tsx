import { Cards } from "./variants/Cards";
import { Quotes } from "./variants/Quotes";
import type { VariantMap } from "../variantMap";
import type { TestimonialsSection } from "@/types/site";

/**
 * Роутер секции Testimonials.
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  TestimonialsSection,
  NonNullable<TestimonialsSection["variant"]>
> = {
  quotes: Quotes,
  cards: Cards,
};

export function Testimonials(props: TestimonialsSection) {
  const Variant = variants[props.variant ?? "quotes"] ?? Quotes;
  return <Variant {...props} />;
}

export default Testimonials;
