import IMask from "imask";

const RU_PHONE_PATTERN = "+7 000 000-00-00";

const toMasked = IMask.createPipe(
  RU_PHONE_PATTERN,
  IMask.PIPE_TYPE.UNMASKED,
  IMask.PIPE_TYPE.MASKED,
);

function normalizeDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  return digits.slice(0, 11);
}

/**
 * Маска номера: +7 900 000-00-00.
 * Курсор руками не двигаю — при обычном наборе/стирании с конца
 * это не бросается в глаза, а возиться с caret-tracking неохота.
 */
export function formatRuPhone(raw: string): string {
  const digits = normalizeDigits(raw);
  if (digits.length === 0) return "";
  return toMasked(digits.slice(1));
}

/** Полный номер — 10 цифр после кода страны. */
export function isRuPhoneComplete(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}
