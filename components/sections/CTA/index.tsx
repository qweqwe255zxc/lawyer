import { Band } from "./variants/Band";
import { Quiet } from "./variants/Quiet";
import type { VariantMap } from "../variantMap";
import type { CtaSection } from "@/types/site";

/**
 * Роутер секции CTA. Единственный блок на странице с акцентной заливкой
 * фона — специально держим его в одном экземпляре. Внутри по минимуму:
 * заголовок, строка, кнопка, ничего лишнего.
 *
 * number, eyebrow и nav секция не читает: варианты их не деструктурируют,
 * задать в конфиге можно, эффекта не будет.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<CtaSection, NonNullable<CtaSection["variant"]>> = {
  band: Band,
  quiet: Quiet,
};

export function CTA(props: CtaSection) {
  const Variant = variants[props.variant ?? "band"] ?? Band;
  return <Variant {...props} />;
}

export default CTA;
