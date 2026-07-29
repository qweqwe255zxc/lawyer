import { resolveHeroLayout } from "./parts/resolveHeroLayout";
import { Split } from "./variants/Split";
import { TypeOnly } from "./variants/TypeOnly";
import type { VariantMap } from "../variantMap";
import type { HeroSection } from "@/types/site";

/**
 * Роутер секции Hero.
 *
 * Единственный роутер, который выбирает вариант не только по
 * props.variant: у hero вторая колонка может включиться сама (widget) или
 * не включиться вопреки конфигу (split без image). Все три правила
 * собраны в resolveHeroLayout — там же, где их читает сам Split, чтобы
 * они не разъехались между роутером и вариантом.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<HeroSection, NonNullable<HeroSection["variant"]>> = {
  "type-only": TypeOnly,
  split: Split,
};

export function Hero(props: HeroSection) {
  const { withImage, isSplit } = resolveHeroLayout(props);

  if (process.env.NODE_ENV !== "production" && props.widget && withImage) {
    console.warn(
      `[Hero] Секция "${props.id}": widget и image заняли бы одну колонку — показано фото, widget пропущен.`,
    );
  }

  const Variant = isSplit ? variants.split : variants["type-only"];
  return <Variant {...props} />;
}

export default Hero;
