import type { HeroSection } from "@/types/site";

export interface HeroLayout {
  /** Вторую колонку занимает фото. */
  withImage: boolean;
  /** Вторую колонку занимает карточка метрик. */
  withWidget: boolean;
  /** Нужна двухколоночная раскладка (Split), а не голая типографика. */
  isSplit: boolean;
}

/**
 * Правила второй колонки hero — в одном месте, потому что их читают двое:
 * роутер (какой вариант рендерить) и сам Split (что положить в колонку).
 *
 * 1. variant="split" БЕЗ image откатывается на type-only — рисовать
 *    пустую половину экрана нечем.
 * 2. widget включает двухколоночную раскладку САМ, даже если variant не
 *    задан: карточка метрик бессмысленна под заголовком во всю ширину.
 * 3. Фото и виджет делят одну колонку. Если заданы оба — побеждает фото
 *    (оно было раньше), виджет не рендерится вовсе. Роутер об этом
 *    предупреждает в dev.
 */
export function resolveHeroLayout(props: HeroSection): HeroLayout {
  const variant = props.variant ?? "type-only";
  const withImage = variant === "split" && Boolean(props.image);
  const withWidget = Boolean(props.widget) && !withImage;

  return { withImage, withWidget, isSplit: withImage || withWidget };
}
