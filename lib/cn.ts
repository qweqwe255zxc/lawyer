export type ClassValue = string | false | null | undefined;

/** Минимальный склейщик классов — clsx ради трёх строк в бандл не тянем. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
