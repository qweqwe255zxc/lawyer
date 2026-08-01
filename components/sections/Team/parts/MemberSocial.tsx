import { getIcon } from "@/lib/icons";
import type { TeamMember } from "@/types/site";

interface MemberSocialProps {
  items?: TeamMember["social"];
}

/** Ряд иконок-ссылок под описанием человека. Общий для нескольких карточных вариантов. */
export function MemberSocial({ items }: MemberSocialProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="mt-5 flex items-center gap-3">
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
