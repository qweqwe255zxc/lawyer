import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NotFoundProps } from "../types";

/**
 * Та же 12-колоночная раскладка, что и у секций страницы: код ошибки
 * колонтитулом на левом поле, текст в основной колонке. Хедера и футера
 * тут нет намеренно — на странице ошибки нужен один выход, а не полное
 * меню; вместо них строка бренда сверху и реквизиты снизу.
 */
export function Default({ brand, contacts }: NotFoundProps) {
  return (
    <main
      data-surface="paper"
      className="flex min-h-screen flex-col bg-bg text-fg"
    >
      <Container className="flex flex-1 flex-col">
        <div className="flex h-header items-center border-b border-transparent">
          <span className="inline-flex items-center gap-2 font-display text-h3">
            <BrandMark mark={brand.mark} alt={brand.name} />
            <span>{brand.name}</span>
          </span>
        </div>

        <div className="grid flex-1 content-center gap-x-gutter py-section md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="tabular text-caption font-medium uppercase text-fg-muted">
              Ошибка 404
            </span>
          </div>

          <div className="md:col-span-9">
            <h1 className="max-w-[16ch] font-display text-h1">
              Такой страницы нет
            </h1>
            <p className="mt-8 max-w-[48ch] text-lead text-fg-muted">
              Ссылка устарела или в адресе опечатка. Вернитесь на главную — или
              позвоните, так быстрее.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/">На главную</Button>
              <Button href={contacts.phoneHref} variant="secondary">
                {contacts.phone}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-rule py-8">
          <p className="text-small text-fg-muted">{brand.legalName}</p>
        </div>
      </Container>
    </main>
  );
}

export default Default;
