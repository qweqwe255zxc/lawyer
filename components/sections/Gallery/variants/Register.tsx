import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/reveal";
import { CaseTags } from "../parts/CaseTags";
import { GalleryShell } from "../parts/GalleryShell";
import type { GallerySection } from "@/types/site";

/**
 * Реестр: строка на всю ширину. Так помещается больше и читается как
 * список дел, а не как галерея. Вариант по умолчанию в «Экономе».
 *
 * Колонка статуса появляется, только если status задан хотя бы у одного
 * кейса: без неё раскладка остаётся прежней (3/4/4/1), с ней ужимается
 * до 3/3/3/2/1 — те же 12 колонок, шапка и строки считают ширины из
 * одного места.
 */
export function Register(props: GallerySection) {
  const { items } = props;
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
    <GalleryShell {...props}>
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
    </GalleryShell>
  );
}

export default Register;
