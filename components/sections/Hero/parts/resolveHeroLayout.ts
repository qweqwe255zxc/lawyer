import type { HeroSection } from "@/types/site";

export interface HeroLayout {
  /** Вторую колонку занимает фото. */
  withImage: boolean;
  /** Вторую колонку занимает карточка метрик. */
  withWidget: boolean;
  /** Нужна двухколоночная раскладка (Split), а не голая типографика. */
  isSplit: boolean;
  /**
   * Какой вариант в итоге рендерить. Роутер берёт ИМЕННО ЭТО поле, а не
   * props.variant: у пары type-only ↔ split есть правила подмены (ниже),
   * у всех остальных resolved === props.variant.
   */
  resolved: NonNullable<HeroSection["variant"]>;
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
 *
 * Обе подмены касаются ТОЛЬКО пары type-only ↔ split: это исторические
 * умолчания, на которые опирается конфиг и таблица тарифов. Любой другой
 * вариант (centered, showcase, billboard…) роутер отдаёт как есть — у них
 * своя работа со второй колонкой, и молча подменять выбор человека
 * нельзя. Раньше роутер вообще не смотрел на props.variant и выбирал
 * только между этими двумя файлами: добавить третий вариант было
 * невозможно, его бы просто никогда не выбрали.
 */
export function resolveHeroLayout(props: HeroSection): HeroLayout {
  const variant = props.variant ?? "type-only";
  const withImage = variant === "split" && Boolean(props.image);
  const withWidget = Boolean(props.widget) && !withImage;
  const isSplit = withImage || withWidget;

  const swappable = variant === "type-only" || variant === "split";
  const resolved = swappable ? (isSplit ? "split" : "type-only") : variant;

  return { withImage, withWidget, isSplit, resolved };
}
