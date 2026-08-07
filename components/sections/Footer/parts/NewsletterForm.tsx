import { Button } from "@/components/ui/Button";
import type { FooterNewsletter } from "@/types/site";

interface NewsletterFormProps {
  newsletter: FooterNewsletter;
  className?: string;
}

/**
 * Форма подписки в футере — общий кусок, читают все варианты Footer.
 * Настоящий `method="get"`, как HeroSearch: значение уходит на `action`
 * обычным параметром запроса, без JS и без бэкенда в шаблоне — принять
 * запрос должен сам проект.
 *
 * `h-10` на поле — та же высота, что у Button size="sm": .ui-control сам
 * по себе высоту не задаёт (только паддинги токена), и без явной высоты
 * поле с кнопкой в ряд заметно не совпадали по нижнему краю.
 *
 * Перенос строки — по содержимому (`flex-wrap`), не по фиксированному
 * брейкпоинту: колонка формы у некоторых вариантов (например,
 * Monogram — md:col-span-3 в сетке на 12 колонок) остаётся узкой и на
 * десктопе, поле+кнопка в ряд там не поместятся независимо от ширины
 * экрана. `grow-[999]` на поле — оно забирает почти всё свободное
 * место в ряду, кнопка остаётся по размеру контента; но когда кнопка
 * переносится на свою строку и остаётся там одна, весь свободный
 * remainder этой строки достаётся ей (`grow` без конкурента) — она
 * растягивается на всю ширину блока, а не остаётся мелкой кнопкой
 * слева.
 */
export function NewsletterForm({ newsletter, className }: NewsletterFormProps) {
  return (
    <div className={className}>
      <p className="text-caption font-medium uppercase text-fg-muted">
        {newsletter.title}
      </p>
      <p className="mt-3 text-small text-fg-muted">{newsletter.text}</p>

      <form
        action={newsletter.action}
        method="get"
        className="mt-4 flex flex-wrap gap-x-2 gap-y-3"
      >
        <label className="sr-only" htmlFor="footer-newsletter-email">
          {newsletter.title}
        </label>
        <input
          id="footer-newsletter-email"
          name="email"
          type="email"
          required
          placeholder={newsletter.placeholder}
          className="ui-control h-10 min-w-40 grow-[999] basis-0 text-small text-fg placeholder:text-fg-muted/60 hover:border-fg focus:border-fg focus:outline-none"
        />
        <Button type="submit" variant="primary" size="sm" className="grow">
          {newsletter.submitLabel}
        </Button>
      </form>
    </div>
  );
}

export default NewsletterForm;
