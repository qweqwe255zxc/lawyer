import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { PricingPlan } from "@/types/site";

/**
 * Содержимое одного тарифа: фото, название, цена, описание, список
 * возможностей, кнопка. Общее для всех раскладок.
 *
 * Фото — фиксированный бокс aspect-[4/3] с .ui-media, тот же, что в
 * Features: см. docs/section-system.md, раздел 2.
 */
export function PlanContent({ plan }: { plan: PricingPlan }) {
  return (
    <>
      {plan.photo ? (
        <div className="ui-media relative mb-5 aspect-[4/3] w-full overflow-hidden">
          <Image
            src={plan.photo}
            alt={plan.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <h3 className="font-display text-h3">{plan.name}</h3>
      <p className="tabular mt-6 font-display text-stat">
        {plan.price}
        {plan.unit ? (
          <span className="ml-2 text-body text-fg-muted">{plan.unit}</span>
        ) : null}
      </p>
      {plan.text ? (
        <p className="mt-4 text-body text-fg-muted">{plan.text}</p>
      ) : null}

      <ul className="mt-7 space-y-2.5 border-t border-rule pt-7">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-small text-fg-muted">
            <span aria-hidden="true" className="select-none">
              —
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.action ? (
        <div className="mt-8">
          <Button
            href={plan.action.href}
            variant={plan.action.variant ?? "secondary"}
            size="sm"
          >
            {plan.action.label}
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default PlanContent;
