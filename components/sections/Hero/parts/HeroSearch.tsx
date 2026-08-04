import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getIcon } from "@/lib/icons";
import type { HeroSearch as HeroSearchData } from "@/types/site";

/**
 * Поисковая строка в первом экране — настоящая форма method="get", а не
 * картинка формы: значение уходит на search.action обычным параметром
 * запроса. Ни состояния, ни fetch тут нет, поэтому и "use client" не
 * нужен — весь hero остаётся серверным.
 *
 * Подпись — <label>, а не плейсхолдер: плейсхолдер исчезает при первом
 * же символе, и человек, отвлёкшийся на середине, теряет смысл поля.
 * Плейсхолдер остаётся подсказкой формата («город, район или индекс»).
 *
 * Поле и кнопка стоят в карточке (Card variant="elevated"): на фоне
 * секции форма без подложки читалась бы как случайно упавший инпут, а
 * подъём тут нужен по смыслу — это главное действие первого экрана.
 */
export function HeroSearch({ search }: { search: HeroSearchData }) {
  const SearchIcon = getIcon("search");
  const name = search.name ?? "q";
  const fieldId = `hero-search-${name}`;

  return (
    <Card variant="elevated" className="mt-12">
      <form action={search.action} method="get">
        <label
          htmlFor={fieldId}
          className="block text-caption font-medium uppercase text-fg-muted"
        >
          {search.label}
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            {SearchIcon ? (
              <SearchIcon
                aria-hidden="true"
                strokeWidth={1.5}
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-fg-muted"
              />
            ) : null}

            {/* ui-control — тот же слой геометрии, что у полей формы
                контактов: в «Экономе» это подчёркивание, в «Стандарте»
                коробка с заливкой. Отступ слева увеличен под иконку. */}
            <input
              id={fieldId}
              name={name}
              type="search"
              placeholder={search.placeholder}
              className="ui-control w-full border-rule bg-transparent py-3 pl-12 pr-4 text-body text-fg placeholder:text-fg-muted"
            />
          </div>

          <Button type="submit">{search.submitLabel}</Button>
        </div>
      </form>
    </Card>
  );
}

export default HeroSearch;
