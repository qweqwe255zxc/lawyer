import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { revealDelay } from "@/lib/reveal";
import type { CtaLink } from "@/types/site";

interface HeroLedeProps {
  headline: string[];
  lead?: string;
  actions?: CtaLink[];
  /**
   * Понизить потолок --size-h1 с 96px до 72px. Нужно двухколоночным
   * раскладкам: даже при col-span-6 (~600px) базовый --size-h1 иногда не
   * оставляет места двум словам в одной ручной строке («Хороший кофе»),
   * и она сама переносится внутри уже готовой строки — второй уровень
   * переноса поверх авторского. --size-h1 — обычная CSS-переменная,
   * override внутри поддерева меняет её только тут и не трогает токен
   * глобально (type-only, Team, not-found не затронуты).
   */
  compact?: boolean;
  /** Ширина колонки на md+ — своя у каждой раскладки. */
  className?: string;
}

const COMPACT_H1 = {
  "--size-h1": "clamp(2.125rem, 0.9rem + 4vw, 4.5rem)",
} as CSSProperties;

/**
 * Заголовок, лид и кнопки — сердце hero, одинаковое во всех раскладках.
 * Последняя строка headline всегда идёт курсивом в акценте: это одно из
 * шести мест, где акцент вообще появляется.
 */
export function HeroLede({
  headline,
  lead,
  actions = [],
  compact = false,
  className,
}: HeroLedeProps) {
  return (
    <div className={className}>
      {/* Ручные переносы включаются только с md: на узком экране они дают
          висячие строки, там заголовок верстается потоком. */}
      <h1
        className="font-heading text-h1"
        style={compact ? COMPACT_H1 : undefined}
        data-reveal
      >
        {headline.map((line, index) => (
          <span key={line} className="md:block">
            {index === headline.length - 1 ? (
              <span className="font-heading italic text-accent">{line}</span>
            ) : (
              line
            )}
            {index < headline.length - 1 ? " " : null}
          </span>
        ))}
      </h1>

      {lead ? (
        <p
          className="mt-8 max-w-[52ch] text-lead text-fg-muted"
          data-reveal
          style={revealDelay(1)}
        >
          {lead}
        </p>
      ) : null}

      {actions.length > 0 ? (
        <div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          data-reveal
          style={revealDelay(2)}
        >
          {actions.map((action) => (
            <Button
              key={action.href}
              href={action.href}
              variant={action.variant ?? "primary"}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default HeroLede;
