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
  /**
   * Отступ meta сверху. По умолчанию mt-6 (обычный поток). Rail отдаёт
   * mt-auto: там <li> — flex-col h-full на всю высоту ряда, и meta нужно
   * прижать к низу самой длинной карточки в ряду, а не оставлять на своём
   * месте по факту длины конкретного описания.
   */
  metaClassName?: string;
}

/**
 * Текст шага: заголовок, описание, мета. Общий для всех раскладок —
 * варианты отличаются тем, ЧТО вокруг него (линейка, карточка, нода на
 * оси), а не самим текстом.
 *
 * item.number тут не выводится: в разных вариантах он живёт в разных
 * местах (крупный сериф над заголовком в rail/stack, бейдж на оси в
 * timeline-vertical), поэтому его рисует вариант.
 */
export function StepContent({ item, titleClassName, metaClassName = "mt-6" }: StepContentProps) {
  return (
    <>
      {/* max-w — предсказуемая длина строки для длинного заголовка: без
          неё заголовок растягивался на всю ширину колонки и мог
          перенестись на 5-6 строк вместо читаемых 2-3. */}
      <h3 className={cn(titleClassName, "max-w-[22ch] font-display text-h3")}>
        {item.title}
      </h3>
      <p className="mt-3 text-body text-fg-muted">{item.text}</p>

      {item.meta ? (
        <p className={cn(metaClassName, "text-caption font-medium uppercase text-fg-muted")}>
          {item.meta}
        </p>
      ) : null}
    </>
  );
}

export default StepContent;
