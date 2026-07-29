import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { revealDelay } from "@/lib/reveal";
import { GalleryShell } from "../parts/GalleryShell";
import type { GallerySection } from "@/types/site";

/**
 * Кейсы карточками. Для проектов, где кейсов меньше и построчный реестр
 * смотрится пусто, и вариант по умолчанию в «Стандарте» — карточка
 * единственное место, где видна глубина тарифа.
 *
 * Рамку карточки на тёмном блоке держит --card-border, переопределённый
 * в [data-surface="ink"] (обычный hairline на графите почти не виден).
 * Раньше это чинил хардкод border-rule-strong прямо тут.
 */
export function Grid(props: GallerySection) {
  const { items } = props;

  return (
    <GalleryShell {...props}>
      <ul className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={`${item.category}-${item.year}-${index}`}>
            <Card variant="framed" className="h-full">
              <div data-reveal style={revealDelay(index % 3, 40)}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-small font-medium">{item.category}</p>
                  <p className="tabular text-small text-fg-muted">{item.year}</p>
                </div>

                <p className="mt-5 text-small text-fg-muted">
                  <span className="mr-2 text-caption uppercase">Ситуация:</span>
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
    </GalleryShell>
  );
}

export default Grid;
