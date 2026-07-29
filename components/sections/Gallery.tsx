import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import type { CaseItem, GallerySection } from "@/types/site";

/**
 * Теги кейса — мелкие моноширинные плашки под категорией. Отдельной
 * колонки не занимают: их количество у разных кейсов разное, и колонка
 * переменной высоты ломала бы ровные строки реестра.
 */
function CaseTags({ tags }: { tags?: CaseItem["tags"] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <span className="mt-2.5 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </span>
  );
}

/**
 * Единственный тёмный блок на странице. По умолчанию кейсы верстаем как
 * реестр (строка на всю ширину), а не карточками — так помещается больше
 * и читается как список дел, а не как галерея. Акцента тут нет вообще.
 * variant="grid" — альтернативная раскладка карточками для проектов,
 * где кейсов меньше и построчный реестр смотрится пусто.
 *
 * Колонка статуса появляется, только если status задан хотя бы у одного
 * кейса: без неё раскладка реестра остаётся прежней (3/4/4/1), с ней
 * ужимается до 3/3/3/2/1 — те же 12 колонок, шапка и строки считают
 * ширины из одного места.
 */
export function Gallery(props: GallerySection) {
  const {
    id,
    surface = "ink",
    variant = "register",
    number,
    eyebrow,
    title,
    lead,
    items,
    note,
  } = props;

  const isGrid = variant === "grid";
  const hasStatus = items.some((item) => item.status);

  // Классы прописаны литералами целиком (а не собраны из кусков) —
  // иначе сканер Tailwind их не увидит и утилит не будет в сборке.
  const columns = hasStatus
    ? {
        category: "md:col-span-3",
        problem: "md:col-span-3",
        result: "md:col-span-3",
        status: "md:col-span-2",
        year: "md:col-span-1",
      }
    : {
        category: "md:col-span-3",
        problem: "md:col-span-4",
        result: "md:col-span-4",
        status: "md:col-span-2",
        year: "md:col-span-1",
      };

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className="mt-14 md:mt-20">
          {isGrid ? (
            <ul className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <li key={`${item.category}-${item.year}-${index}`}>
                  {/* Раньше тут был border-rule-strong: hairline на
                      графите почти не виден. Теперь это --card-border,
                      переопределённый в [data-surface="ink"] — и им
                      может распорядиться пресет тарифа. */}
                  <Card variant="framed" className="h-full">
                    <div data-reveal style={revealDelay(index % 3, 40)}>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-small font-medium">
                          {item.category}
                        </p>
                        <p className="tabular text-small text-fg-muted">
                          {item.year}
                        </p>
                      </div>

                      <p className="mt-5 text-small text-fg-muted">
                        <span className="mr-2 text-caption uppercase">
                          Ситуация:
                        </span>
                        {item.problem}
                      </p>

                      <p className="mt-4 text-small">
                        <span className="mr-2 text-caption uppercase text-fg-muted">
                          Результат:
                        </span>
                        {item.result}
                      </p>

                      {item.status || item.tags?.length ? (
                        <div className="mt-6 flex flex-wrap items-center gap-1.5">
                          {item.status ? (
                            <Badge variant="soft">{item.status}</Badge>
                          ) : null}
                          {item.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {/* Шапка реестра — только на десктопе, на мобильном роль берут подписи */}
              <div className="hidden border-b border-rule pb-4 md:grid md:grid-cols-12 md:gap-x-gutter">
                <span
                  className={`text-caption font-medium uppercase text-fg-muted ${columns.category}`}
                >
                  Категория
                </span>
                <span
                  className={`text-caption font-medium uppercase text-fg-muted ${columns.problem}`}
                >
                  Ситуация
                </span>
                <span
                  className={`text-caption font-medium uppercase text-fg-muted ${columns.result}`}
                >
                  Результат
                </span>
                {hasStatus ? (
                  <span
                    className={`text-caption font-medium uppercase text-fg-muted ${columns.status}`}
                  >
                    Статус
                  </span>
                ) : null}
                <span
                  className={`text-right text-caption font-medium uppercase text-fg-muted ${columns.year}`}
                >
                  Год
                </span>
              </div>

              <ul>
                {items.map((item, index) => (
                  <li
                    key={`${item.category}-${item.year}-${index}`}
                    data-reveal
                    style={revealDelay(index, 40)}
                    className="grid gap-y-3 border-b border-rule py-7 md:grid-cols-12 md:gap-x-gutter md:py-6"
                  >
                    <div className={columns.category}>
                      <p className="text-small font-medium">{item.category}</p>
                      <CaseTags tags={item.tags} />
                    </div>

                    <p className={`text-small text-fg-muted ${columns.problem}`}>
                      <span className="mr-2 text-caption uppercase md:hidden">
                        Ситуация:
                      </span>
                      {item.problem}
                    </p>

                    <p className={`text-small ${columns.result}`}>
                      <span className="mr-2 text-caption uppercase text-fg-muted md:hidden">
                        Результат:
                      </span>
                      {item.result}
                    </p>

                    {hasStatus ? (
                      <div className={columns.status}>
                        {item.status ? (
                          <Badge variant="soft">{item.status}</Badge>
                        ) : null}
                      </div>
                    ) : null}

                    <p
                      className={`tabular text-small text-fg-muted md:text-right ${columns.year}`}
                    >
                      {item.year}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {note ? (
            <p className="mt-8 max-w-[62ch] text-small text-fg-muted">{note}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default Gallery;
