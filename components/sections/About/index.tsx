import { Panel } from "./variants/Panel";
import { PhotoLeft } from "./variants/PhotoLeft";
import { PhotoRight } from "./variants/PhotoRight";
import { QuietSplit } from "./variants/QuietSplit";
import { SplitActions } from "./variants/SplitActions";
import { TypeOnly } from "./variants/TypeOnly";
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
  "type-only": TypeOnly,
  "split-actions": SplitActions,
  "quiet-split": QuietSplit,
  panel: Panel,
};

export function About(props: AboutSection) {
  const requested = props.variant ?? "photo-right";
  const needsPhoto = (requested === "photo-right" || requested === "photo-left") && !props.photo;

  if (process.env.NODE_ENV !== "production" && needsPhoto) {
    console.warn(
      `[About] Секция "${props.id}": variant="${requested}" без photo — фото занять нечем, ` +
        `показан "type-only". Дайте photo: "/images/..." или возьмите другой variant. ` +
        `См. docs/section-system.md.`,
    );
  }

  const resolved = needsPhoto ? "type-only" : requested;
  const Variant = variants[resolved] ?? PhotoRight;
  return <Variant {...props} />;
}

export default About;
