import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { PricingClosing as PricingClosingData } from "@/types/site";

interface PricingClosingProps {
  closing: PricingClosingData;
  className?: string;
}

/**
 * Замыкающий блок под тарифами — две оправы, выбранные ДАННЫМИ, а не
 * variant'ом: closing.surface === "ink" даёт сплошной акцентный/тёмный
 * баннер (заголовок+текст+кнопки в строку, без фото/пунктов — раньше
 * это была единственная раскладка variants/Banner.tsx); любое другое
 * значение (или его отсутствие) даёт раскладку с опциональным фото и
 * списком пунктов слева-справа (раньше — единственная раскладка
 * variants/Matrix.tsx). Так `closing` можно задать при любом variant,
 * а сам site.config решает, какая из двух оправ подходит контенту.
 */
export function PricingClosing({ closing, className }: PricingClosingProps) {
  if (closing.surface === "ink") {
    return (
      <div
        data-surface={closing.surface}
        className={cn("rounded-card bg-bg p-8 text-fg md:p-12", className)}
        data-reveal
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[36ch]">
            <h3 className="font-heading text-h2">{closing.title}</h3>
            {closing.text ? (
              <p className="mt-3 text-body text-fg-muted">{closing.text}</p>
            ) : null}
          </div>
          {closing.actions && closing.actions.length > 0 ? (
            <div className="flex shrink-0 flex-wrap gap-4">
              {closing.actions.map((action) => (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={action.variant ?? "secondary"}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-x-gutter gap-y-8 md:grid-cols-12 md:items-center", className)}>
      {closing.image ? (
        <div className="ui-media-raised relative aspect-[4/3] w-full overflow-hidden md:col-span-5">
          <Image
            src={closing.image}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className={closing.image ? "md:col-span-7" : "md:col-span-12"}>
        <h3 className="font-heading text-h2">{closing.title}</h3>
        {closing.text ? (
          <p className="mt-4 max-w-[56ch] text-body text-fg-muted">{closing.text}</p>
        ) : null}
        {closing.points && closing.points.length > 0 ? (
          <ul className="mt-6 space-y-2.5">
            {closing.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-small text-fg-muted">
                <Check
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-0.5 size-4 shrink-0 text-accent"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {closing.actions && closing.actions.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-4">
            {closing.actions.map((action) => (
              <Button key={action.label} href={action.href} variant={action.variant ?? "primary"}>
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PricingClosing;
