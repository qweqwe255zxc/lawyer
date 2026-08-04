/**
 * Секция без полноценного SectionHeader (band/grid — самые плотные
 * раскладки Stats, лид тут был бы лишним весом), но номер раздела обязан
 * быть виден — иначе счёт на странице визуально прыгает с 01 на 03. title
 * рядом с номером — как у любой другой секции; lead сюда сознательно не
 * добавляем, это осталось бы уже полноценной шапкой, а не лёгкой строкой.
 */
export function StatsNumber({
  number,
  eyebrow,
  title,
}: {
  number?: string;
  eyebrow?: string;
  title?: string;
}) {
  if (!number && !eyebrow && !title) return null;

  return (
    <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 md:mb-8">
      {number ? (
        <span className="tabular text-caption font-medium uppercase text-fg-muted">
          {number}
        </span>
      ) : null}
      {eyebrow ? (
        <span className="text-caption font-medium uppercase text-fg-muted">{eyebrow}</span>
      ) : null}
      {title ? <h2 className="font-heading text-h3">{title}</h2> : null}
    </div>
  );
}

export default StatsNumber;
