import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import type { TeamMember } from "@/types/site";

interface MemberSocialProps {
  items?: TeamMember["social"];
  /**
   * По умолчанию просто mt-5. В карточках, где ряд иконок должен
   * прижиматься к низу (flex-колонка), сюда передают "mt-auto pt-5" —
   * САМ компонент возвращает null при пустом items, поэтому класс не
   * может жить на обёртке вызывающего файла: такая обёртка остаётся в
   * разметке (со своим паддингом) даже когда внутри пусто.
   */
  className?: string;
}

/** Ряд иконок-ссылок под описанием человека. Общий для нескольких карточных вариантов. */
export function MemberSocial({ items, className = "mt-5" }: MemberSocialProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        if (!Icon) return null;

        return (
          <li key={item.href}>
            <a
              href={item.href}
              aria-label={item.label}
              className="flex size-8 items-center justify-center text-fg-muted transition-colors hover:text-fg"
            >
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default MemberSocial;
