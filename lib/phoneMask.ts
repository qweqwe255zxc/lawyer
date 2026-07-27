/**
 * Маска номера: +7 900 000-00-00.
 * Курсор руками не двигаю — при обычном наборе/стирании с конца
 * это не бросается в глаза, а возиться с caret-tracking неохота.
 */
export function formatRuPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";

  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let result = "+7";
  if (rest.length > 0) result += ` ${rest.slice(0, 3)}`;
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;

  return result;
}

/** Полный номер — 10 цифр после кода страны. */
export function isRuPhoneComplete(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}
