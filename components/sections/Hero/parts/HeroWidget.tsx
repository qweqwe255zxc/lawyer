import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type {
  HeroWidgetChart,
  HeroWidget as HeroWidgetData,
} from "@/types/site";

/** Проценты — данные, а не оформление: значение вне 0–100 подрезаем. */
function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * Столбиковая диаграмма под метриками. aria-hidden по той же причине,
 * что и полоса прогресса ниже: у столбцов нет подписей, и озвучивать
 * «семь столбиков разной высоты» экранному диктору незачем — смысл
 * несут метрики выше и caption под диаграммой.
 *
 * Высота столбца — процент от контейнера, а не пиксели: высоту держит
 * сам контейнер, и диаграмма одинаково работает в узкой колонке и в
 * широкой. Выделенный столбец красится акцентом — это ровно тот случай
 * «одно значение важнее прочих», ради которого акцент и существует.
 */
function WidgetChart({ chart }: { chart: HeroWidgetChart }) {
  return (
    <div className="mt-7">
      <div
        aria-hidden="true"
        className="flex h-32 items-end gap-2 rounded-card bg-badge-soft p-4"
      >
        {chart.values.map((value, index) => (
          <span
            key={index}
            className={cn(
              "block flex-1 rounded-control",
              index === chart.peakIndex ? "bg-accent" : "bg-rule-strong",
            )}
            style={{ height: `${clampPercent(value)}%` }}
          />
        ))}
      </div>

      {chart.caption ? (
        <p className="mt-3 text-caption text-fg-muted">{chart.caption}</p>
      ) : null}
    </div>
  );
}

/**
 * Карточка метрик во второй колонке. Card variant="elevated", а не
 * "framed": подъём тут нужен по смыслу (витрина продукта на первом
 * экране), а не по тарифу.
 *
 * Две раскладки метрик живут в одном файле, а не в отдельных вариантах:
 * это не два дизайна секции, а одна карточка с ручкой на форму подачи —
 * ровно как containerVariant у Stats (docs/section-system.md, раздел 7,
 * «Вторая ось»).
 */
export function HeroWidget({ widget }: { widget: HeroWidgetData }) {
  const tiles = widget.layout === "tiles";

  return (
    <Card variant="elevated">
      {widget.badge ? (
        <Badge variant="soft" className="mb-5">
          {widget.badge}
        </Badge>
      ) : null}

      {/* В плиточной раскладке заголовок работает колонтитулом панели:
          крупный кегль спорил бы с крупными значениями в самих плитках,
          и панель получала бы два центра внимания вместо одного. */}
      <p
        className={
          tiles
            ? "text-caption font-medium uppercase text-fg-muted"
            : "font-display text-h3"
        }
      >
        {widget.title}
      </p>

      {tiles ? (
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {widget.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-card bg-badge-soft px-5 py-4"
            >
              <dt className="text-small text-fg-muted">{metric.label}</dt>
              <dd className="tabular mt-2 font-display text-h2">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <dl className="mt-7 space-y-6">
          {widget.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-small text-fg-muted">{metric.label}</dt>
                <dd className="tabular font-display text-h3">{metric.value}</dd>
              </div>

              {typeof metric.progress === "number" ? (
                // Значение продублировано текстом в <dd> выше, поэтому
                // полоса — чистая графика (aria-hidden), а не progressbar,
                // который скринридер прочитает вторым голосом то же самое.
                <div
                  aria-hidden="true"
                  className="mt-3 h-1 w-full overflow-hidden rounded-pill bg-rule"
                >
                  <span
                    className="block h-full rounded-pill bg-accent"
                    style={{ width: `${clampPercent(metric.progress)}%` }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </dl>
      )}

      {widget.chart ? <WidgetChart chart={widget.chart} /> : null}
    </Card>
  );
}

export default HeroWidget;
