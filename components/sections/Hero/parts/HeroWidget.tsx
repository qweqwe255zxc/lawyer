import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { HeroWidget as HeroWidgetData } from "@/types/site";

/** Полоса прогресса — данные, а не оформление: значение вне 0–100 подрезаем. */
function progressWidth(value: number): string {
  return `${Math.min(100, Math.max(0, value))}%`;
}

/**
 * Карточка метрик во второй колонке. Card variant="elevated", а не
 * "framed": подъём тут нужен по смыслу (витрина продукта на первом
 * экране), а не по тарифу.
 */
export function HeroWidget({ widget }: { widget: HeroWidgetData }) {
  return (
    <Card variant="elevated">
      {widget.badge ? (
        <Badge variant="soft" className="mb-5">
          {widget.badge}
        </Badge>
      ) : null}

      <p className="font-display text-h3">{widget.title}</p>

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
                  style={{ width: progressWidth(metric.progress) }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </dl>
    </Card>
  );
}

export default HeroWidget;
