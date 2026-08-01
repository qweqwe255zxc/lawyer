import { getIcon } from "@/lib/icons";
import type { HeroTrust } from "@/types/site";

interface TrustRowProps {
  trust?: HeroTrust;
  className?: string;
}

/**
 * Строка «нам доверяют» под отзывами — тот же тип и тот же приём, что у
 * Hero/parts/HeroTrust.tsx (имена текстом + иконка из общего реестра, не
 * логотипы-картинки: чужой брендинг в шаблон не тащим).
 */
export function TrustRow({ trust, className }: TrustRowProps) {
  if (!trust) return null;

  return (
    <div className={className}>
      <p className="text-caption font-medium uppercase text-fg-muted">{trust.text}</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
        {trust.items.map((item) => {
          const Icon = getIcon(item.icon);

          return (
            <li key={item.label} className="flex items-center gap-2 text-small font-medium text-fg-muted">
              {Icon ? <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" /> : null}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TrustRow;
