/**
 * Секция без заголовка (SectionHeader тут не участвует), но номер раздела
 * обязан быть виден — иначе счёт на странице визуально прыгает с 01 на 03.
 * eyebrow / title / lead из SectionBase Stats не читает вообще.
 */
export function StatsNumber({ number }: { number?: string }) {
  if (!number) return null;

  return (
    <p className="tabular mb-6 text-caption font-medium uppercase text-fg-muted md:mb-8">
      {number}
    </p>
  );
}

export default StatsNumber;
