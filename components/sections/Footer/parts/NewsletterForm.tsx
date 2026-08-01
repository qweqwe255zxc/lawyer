import { Button } from "@/components/ui/Button";
import type { FooterNewsletter } from "@/types/site";

interface NewsletterFormProps {
  newsletter: FooterNewsletter;
}

/**
 * Форма подписки в футере (Gradient/Glass). Настоящий `method="get"`,
 * как HeroSearch: значение уходит на `action` обычным параметром запроса,
 * без JS и без бэкенда в шаблоне — принять запрос должен сам проект.
 */
export function NewsletterForm({ newsletter }: NewsletterFormProps) {
  return (
    <div>
      <p className="text-caption font-medium uppercase text-fg-muted">
        {newsletter.title}
      </p>
      <p className="mt-3 text-small text-fg-muted">{newsletter.text}</p>

      <form action={newsletter.action} method="get" className="mt-4 flex gap-2">
        <label className="sr-only" htmlFor="footer-newsletter-email">
          {newsletter.title}
        </label>
        <input
          id="footer-newsletter-email"
          name="email"
          type="email"
          required
          placeholder={newsletter.placeholder}
          className="ui-control min-w-0 flex-1 text-small text-fg placeholder:text-fg-muted/60 hover:border-fg focus:border-fg focus:outline-none"
        />
        <Button type="submit" variant="primary" size="sm">
          {newsletter.submitLabel}
        </Button>
      </form>
    </div>
  );
}

export default NewsletterForm;
