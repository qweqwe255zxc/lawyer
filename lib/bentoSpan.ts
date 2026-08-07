type Span = 1 | 2;
type Breakpoint = "sm" | "md" | "lg" | "xl";

export type BentoColumns = Partial<Record<Breakpoint, 2 | 3 | 4>>;

/**
 * Спаны для одного ряда сетки шириной `columns` слотов. Карточка
 * растягивается на 2 слота (col-span-2) только там, где это ровно
 * закрывает ширину ряда — не там, где "ещё есть место". Одиночный
 * хвостовой элемент, которому не хватает пары до целого ряда, остаётся
 * в 1 слот (не растягивается вхолостую).
 *
 * Ряды-растяжки идут с начала последовательности, а не с конца: если
 * `total` не делится на `columns` нацело, нужное число рядов вида
 * "2+1+…+1" (сумма = columns) ставится в начало, ориентация
 * (растянутый элемент первым/последним) чередуется через ряд — тот же
 * приём, что даёт зеркальный узор 2×2 в референсе (первый ряд
 * большая+малая, второй — малая+большая). Остаток — обычные ряды по
 * `columns` карточек в 1 слот.
 */
function rowSpans(total: number, columns: number): Span[] {
  if (columns < 2 || total <= 0) return new Array(Math.max(total, 0)).fill(1);

  const need = (columns - (total % columns)) % columns;
  const spans: Span[] = [];
  let placed = 0;
  let row = 0;

  while (row < need && total - placed >= columns - 1) {
    const size = columns - 1;
    const doubleFirst = row % 2 === 0;
    for (let i = 0; i < size; i++) {
      spans.push(doubleFirst ? (i === 0 ? 2 : 1) : i === size - 1 ? 2 : 1);
    }
    placed += size;
    row += 1;
  }

  while (placed < total) {
    spans.push(1);
    placed += 1;
  }

  return spans;
}

const SPAN_CLASS: Record<Breakpoint, Record<Span, string>> = {
  sm: { 1: "sm:col-span-1", 2: "sm:col-span-2" },
  md: { 1: "md:col-span-1", 2: "md:col-span-2" },
  lg: { 1: "lg:col-span-1", 2: "lg:col-span-2" },
  xl: { 1: "xl:col-span-1", 2: "xl:col-span-2" },
};

/**
 * Классы col-span для элемента `index` из `total` в сетке, где число
 * колонок меняется по брейкпоинтам (`columns`, напр. `{ sm: 2, lg: 3 }`).
 * Спаны считаются отдельно на каждом брейкпоинте — раскладка на sm:2 не
 * имеет отношения к тому, что происходит на lg:3.
 */
export function bentoSpan(index: number, total: number, columns: BentoColumns): string {
  return (Object.keys(columns) as Breakpoint[])
    .map((bp) => {
      const count = columns[bp];
      if (!count) return null;
      const span = rowSpans(total, count)[index] ?? 1;
      return SPAN_CLASS[bp][span];
    })
    .filter((value): value is string => Boolean(value))
    .join(" ");
}
