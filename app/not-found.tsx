import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const { brand, contacts } = siteConfig;

  return (
    <main
      data-surface="paper"
      className="flex min-h-screen flex-col bg-bg text-fg"
    >
      <Container className="flex flex-1 flex-col">
        <div className="flex h-header items-center border-b border-transparent">
          <span className="font-display text-h3">
            <span className="text-accent">{brand.mark}</span> {brand.name}
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
