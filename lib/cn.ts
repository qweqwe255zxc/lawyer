import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue };

/** clsx + tailwind-merge: конфликтующие tailwind-классы схлопываются в последний. */
export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values));
}
