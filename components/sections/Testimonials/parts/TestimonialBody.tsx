import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TestimonialItem } from "@/types/site";

interface TestimonialBodyProps {
  item: TestimonialItem;
  /**
   * Классы цитаты и подписи задаёт вариант: в quotes они сидят в сетке.
   *
   * СЮДА ЖЕ вариант обязан передать ступень кегля цитаты (`text-quote` /
   * `text-lead`) — базового размера тут нет намеренно. Причина
   * практическая: две утилиты font-size в одном className конфликтуют не
   * по порядку в строке, а по порядку в собранном CSS, поэтому
   * «база + переопределение из варианта» давало бы непредсказуемый
   * результат. Кегль выбирает тот, кто знает ширину колонки: 28px хороши
   * в широкой колонке quotes и разваливаются в узкой карточке на 1/3
   * ширины, где та же цитата занимает десять строк.
   */
  quoteClassName?: string;
  captionClassName?: string;
  /** Круглый аватар рядом с именем — только там, где у items есть photo (bento/rated-cards/spotlight). */
  showPhoto?: boolean;
}

/**
 * Цитата и подпись автора. Общие для нескольких раскладок — отличается
 * только то, где они стоят и нужен ли аватар (`showPhoto`): в quotes/
 * cards его никогда не было, поэтому по умолчанию выключен — старые
 * варианты не меняют внешний вид, ничего не передавая.
 */
export function TestimonialBody({
  item,
  quoteClassName,
  captionClassName,
  showPhoto = false,
}: TestimonialBodyProps) {
  return (
    <>
      <blockquote className={cn("measure font-display", quoteClassName)}>
        {item.quote}
      </blockquote>

      <figcaption className={cn("flex items-center gap-3", captionClassName)}>
        {showPhoto && item.photo ? (
          <span className="ui-media relative size-10 shrink-0 overflow-hidden rounded-full bg-rule">
            <Image src={item.photo} alt="" fill sizes="40px" className="object-cover" />
          </span>
        ) : null}

        <span className="text-caption font-medium uppercase text-fg-muted">
          {item.author}
          {item.meta ? (
            <span className="mt-1.5 block normal-case tracking-normal">{item.meta}</span>
          ) : null}
        </span>
      </figcaption>
    </>
  );
}

export default TestimonialBody;
