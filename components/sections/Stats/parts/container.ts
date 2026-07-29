import type { StatsSection } from "@/types/site";

/**
 * Подложка под цифрами. Это ВТОРАЯ, независимая от variant ось секции:
 * containerVariant отвечает за блок вокруг цифр, variant — за раскладку
 * самих цифр. Поэтому она живёт в parts/, а не в variants/: любая
 * раскладка обязана уметь встать в любую подложку.
 *
 * flat — линейки сверху/снизу секции, блока нет.
 * elevated / bordered — цифры собираются в один монолитный блок, и тогда
 * линейки секции снимаются (см. isFlat в вариантах): сквозная линейка во
 * всю ширину визуально перечёркивала бы поднятый блок.
 *
 * Глубина блока — те же классы .ui-card*, что и у карточек: значит она
 * растёт вместе с тарифом, а не остаётся навсегда тенью на 6% альфы.
 */
export function containerClasses(
  containerVariant: NonNullable<StatsSection["containerVariant"]>,
): string | undefined {
  switch (containerVariant) {
    case "elevated":
      return "ui-card ui-card--elevated p-7 md:p-9";
    case "bordered":
      return "ui-card ui-card--accent border p-7 md:p-9";
    default:
      return undefined;
  }
}
