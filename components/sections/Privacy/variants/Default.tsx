import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { buildLegalBlocks } from "../parts/legalBlocks";
import type { PrivacyProps } from "../types";

/**
 * Документная раскладка: узкая колонка (760px), разделы на линейках,
 * ничего кроме текста. Хедера и футера тут нет намеренно — со страницы
 * юридического документа нужен один выход, а не полное меню.
 */
export function Default({ brand, contacts, siteUrl }: PrivacyProps) {
  const blocks = buildLegalBlocks(brand, contacts);

  return (
    <main data-surface="paper" className="bg-bg text-fg">
      <Container width="narrow">
        <div className="flex h-header items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-h3"
          >
            <BrandMark mark={brand.mark} alt={brand.name} />
            <span>{brand.name}</span>
          </Link>
        </div>

        <article className="border-t border-rule py-section">
          <p className="text-caption font-medium uppercase text-fg-muted">
            Документ
          </p>
          <h1 className="mt-6 font-display text-h2">
            Политика конфиденциальности
          </h1>
          <p className="mt-6 measure text-body text-fg-muted">
            Настоящая политика описывает порядок обработки персональных данных
            пользователей сайта {siteUrl.replace(/^https?:\/\//, "")} в
            соответствии с Федеральным законом{" "}
            <span className="legal-ref">от 27.07.2006 № 152-ФЗ</span>.
          </p>

          <div className="mt-14">
            {blocks.map((block) => (
              <section key={block.title} className="border-t border-rule py-8">
                <h2 className="font-display text-h3">{block.title}</h2>
                <ul className="mt-4 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="measure text-body text-fg-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="border-t border-rule pt-8">
            <Link
              href="/"
              className="text-small underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              ← Вернуться на главную
            </Link>
          </div>
        </article>
      </Container>
    </main>
  );
}

export default Default;
