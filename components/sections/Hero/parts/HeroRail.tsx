interface HeroRailProps {
  number?: string;
  rail?: string;
  /** Ширина колонки на md+ — своя у каждой раскладки. */
  className?: string;
}

/**
 * Левое поле: номер раздела и вертикальный колонтитул. До lg — обычная
 * строка над заголовком, с lg — вертикальный текст на поле
 * (writing-mode: vertical-rl, aria-hidden: это декоративный колонтитул,
 * дублирующий уже озвученное).
 */
export function HeroRail({ number, rail, className }: HeroRailProps) {
  const parts = (
    <>
      {number ? (
        <span className="tabular text-caption font-medium uppercase text-fg-muted">
          {number}
        </span>
      ) : null}
      {rail ? (
        <span className="text-caption font-medium uppercase text-fg-muted">
          {rail}
        </span>
      ) : null}
    </>
  );

  return (
    <div className={className}>
      <div className="mb-8 flex items-baseline gap-4 lg:hidden">{parts}</div>

      <div
        className="hidden lg:flex lg:items-center lg:gap-5"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        {parts}
      </div>
    </div>
  );
}

export default HeroRail;
