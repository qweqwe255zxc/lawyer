import { cn } from "@/lib/cn";
import type { StepItem } from "@/types/site";

interface StepContentProps {
  item: StepItem;
  /**
   * Отступ заголовка сверху. Задаётся вариантом, а не обёрткой: лишний
   * div вокруг текста сдвинул бы разметку у всех раскладок сразу ради
   * одного класса. В rail/stack над заголовком стоит крупный номер и
   * нужен mt-5, в карточке таймлайна заголовок идёт первым.
   */
  titleClassName?: string;
}

/**
 * Текст шага: заголовок, описание, мета. Общий для всех раскладок —
 * варианты отличаются тем, ЧТО вокруг него (линейка, карточка, нода на
 * оси), а не самим текстом.
 *
 * item.number тут не выводится: в разных вариантах он живёт в разных
 * местах (крупный сериф над заголовком в rail/stack, бейдж на оси в
 * numbered-nodes), поэтому его рисует вариант.
 */
export function StepContent({ item, titleClassName }: StepContentProps) {
  return (
    <>
      <h3 className={cn(titleClassName, "font-display text-h3")}>
        {item.title}
      </h3>
      <p className="mt-3 text-body text-fg-muted">{item.text}</p>

      {item.meta ? (
        <p className="mt-6 text-caption font-medium uppercase text-fg-muted">
          {item.meta}
        </p>
      ) : null}
    </>
  );
}

export default StepContent;
