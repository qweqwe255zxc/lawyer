import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Порядок обработки персональных данных пользователей сайта в соответствии с 152-ФЗ.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Реквизиты оператора подтягиваются из конфига, текст остальной — заготовка
 * под 152-ФЗ. Перед реальной публикацией у клиента её должен вычитать юрист.
 */
export default function PrivacyPage() {
  const { brand, contacts } = siteConfig;

  const blocks: { title: string; items: string[] }[] = [
    {
      title: "1. Оператор персональных данных",
      items: [
        `Оператором является ${brand.legalName}${contacts.inn ? `, ИНН ${contacts.inn}` : ""}.`,
        `Адрес: ${contacts.address}.`,
        `Контакты для обращений: ${contacts.phone}, ${contacts.email}.`,
      ],
    },
    {
      title: "2. Какие данные обрабатываются",
      items: [
        "Имя, номер телефона, адрес электронной почты и сведения, которые вы добровольно указываете в форме обращения.",
        "Обезличенные технические данные: IP-адрес, тип браузера, источник перехода, действия на сайте — через сервисы веб-аналитики.",
      ],
    },
    {
      title: "3. Цели обработки",
      items: [
        "Связь с вами по оставленной заявке и запись на консультацию.",
        "Оценка перспектив обращения и подготовка ответа по существу вопроса.",
        "Улучшение работы сайта на основании обезличенной статистики.",
      ],
    },
    {
      title: "4. Правовые основания",
      items: [
        "Согласие субъекта персональных данных, выраженное отправкой формы на сайте.",
        "Исполнение договора об оказании юридической помощи, стороной которого является субъект.",
      ],
    },
    {
      title: "5. Срок и порядок хранения",
      items: [
        "Данные хранятся до достижения целей обработки либо до отзыва согласия, но не дольше сроков, установленных законом.",
        "Отозвать согласие можно письмом на " + contacts.email + " — обработка прекращается в течение 30 дней, кроме случаев, когда закон требует иного.",
      ],
    },
    {
      title: "6. Передача третьим лицам",
      items: [
        "Данные не продаются и не передаются третьим лицам, кроме случаев, прямо предусмотренных законом.",
        "Сведения, ставшие известными в связи с оказанием юридической помощи, охраняются адвокатской тайной.",
      ],
    },
    {
      title: "7. Защита",
      items: [
        "Оператор принимает правовые, организационные и технические меры для защиты данных от неправомерного доступа, уничтожения, изменения и распространения.",
      ],
    },
  ];

  return (
    <main data-surface="paper" className="bg-bg text-fg">
      <Container width="narrow">
        <div className="flex h-header items-center">
          <Link href="/" className="font-display text-h3">
            <span className="text-accent">{brand.mark}</span> {brand.name}
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
            пользователей сайта {siteConfig.seo.siteUrl.replace(/^https?:\/\//, "")} в
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
