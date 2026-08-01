import { Band } from "./variants/Band";
import { Boxed } from "./variants/Boxed";
import { Centered } from "./variants/Centered";
import { Left } from "./variants/Left";
import { Panel } from "./variants/Panel";
import { Quiet } from "./variants/Quiet";
import type { VariantMap } from "../variantMap";
import type { CtaSection } from "@/types/site";

/**
 * Роутер секции CTA. Единственный блок на странице с акцентной заливкой
 * фона — специально держим его в одном экземпляре. Внутри по минимуму:
 * заголовок, строка, кнопка, ничего лишнего.
 *
 * number и nav секция не читает: варианты их не деструктурируют, задать
 * в конфиге можно, эффекта не будет. eyebrow читают centered/left/boxed/
 * panel (эйброу пилюлей или точкой) — band/quiet его не показывают.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<CtaSection, NonNullable<CtaSection["variant"]>> = {
  band: Band,
  quiet: Quiet,
  centered: Centered,
  left: Left,
  boxed: Boxed,
  panel: Panel,
};

export function CTA(props: CtaSection) {
  const Variant = variants[props.variant ?? "band"] ?? Band;
  return <Variant {...props} />;
}

export default CTA;
