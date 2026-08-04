import { cn } from "@/lib/cn";

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
 *
 * min-w-0 на колонке и строке ниже lg решает только половину проблемы —
 * контейнеры сжимались до ширины трека, но каждый <span> внутри них
 * остаётся ОТДЕЛЬНЫМ flex-item со своим min-width: auto, и его
 * содержимое (весь `rail` одной строкой) не сжималось следом: браузер
 * переносит текст по словам только пока флекс-item не упёрся в
 * собственный content-based минимум (ширину самого длинного слова), а
 * тот на узкой колонке (col-span-1) всё равно шире доступного места —
 * из-за этого span визуально вылезал за границы своего же контейнера и
 * наезжал на соседнюю колонку с заголовком. min-w-0 + break-words прямо
 * на span снимают этот минимум и разрешают перенос внутри самого слова,
 * а не только между словами.
 */
export function HeroRail({ number, rail, className }: HeroRailProps) {
  const parts = (
    <>
      {number ? (
        <span className="tabular min-w-0 break-words text-caption font-medium uppercase text-fg-muted">
          {number}
        </span>
      ) : null}
      {rail ? (
        <span className="min-w-0 break-words text-caption font-medium uppercase text-fg-muted">
          {rail}
        </span>
      ) : null}
    </>
  );

  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-8 flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1 lg:hidden">
        {parts}
      </div>

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
