import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import type { HeroTrust as HeroTrustData } from "@/types/site";

/**
 * Строка «нам доверяют»: короткая фраза и ряд имён с иконками.
 *
 * Имена набраны текстом, а не картинками логотипов. Причина не в лени:
 * чужие логотипы — это чужие растры произвольного веса, цвета и
 * пропорций, и ряд из них разваливает любую типографическую сетку. Имя
 * плюс иконка из общего реестра даёт ровный ряд в любом проекте. Если
 * клиенту нужны настоящие логотипы, это отдельная секция с нормальной
 * сеткой, а не строка в hero.
 *
 * Иконки, как и везде в шаблоне, идут цветом fg-muted: акцент на
 * иконках в этой системе не используется.
 */
export function HeroTrust({ trust }: { trust: HeroTrustData }) {
  return (
    <div className="mt-12" data-reveal style={revealDelay(3)}>
      <p className="text-small text-fg-muted">{trust.text}</p>

      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
        {trust.items.map((item) => {
          const Icon = getIcon(item.icon);

          return (
            <li
              key={item.label}
              className="flex items-center gap-2 text-small font-medium"
            >
              {Icon ? (
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 text-fg-muted"
                />
              ) : null}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HeroTrust;
