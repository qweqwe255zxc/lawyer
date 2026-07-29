import { PhotoLeft } from "./variants/PhotoLeft";
import { PhotoRight } from "./variants/PhotoRight";
import type { VariantMap } from "../variantMap";
import type { AboutSection } from "@/types/site";

/**
 * Роутер секции About («о нас» / «о месте»).
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  AboutSection,
  NonNullable<AboutSection["variant"]>
> = {
  "photo-right": PhotoRight,
  "photo-left": PhotoLeft,
};

export function About(props: AboutSection) {
  const Variant = variants[props.variant ?? "photo-right"] ?? PhotoRight;
  return <Variant {...props} />;
}

export default About;
