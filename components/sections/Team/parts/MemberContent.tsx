import Image from "next/image";
import { cn } from "@/lib/cn";
import { getInitials } from "./initials";
import type { TeamMember } from "@/types/site";

interface MemberContentProps {
  member: TeamMember;
  /**
   * Аватар вложен в padded Card (Team cards: p-7/md:p-9) — радиус фото
   * обязан отставать от радиуса карточки ровно на этот паддинг (см.
   * .ui-media-inset в globals.css), иначе на Стандарте дуги не делят
   * центр. В TeamList (columns/rows) карточки нет — там обычный .ui-media.
   */
  mediaInset?: boolean;
  /**
   * Переопределяет aspect-ratio аватара для растянутой в 2 колонки
   * карточки (`fillLastRow`, см. lib/gridFill.ts) — без этого аватар
   * удваивал бы не только ширину, но и высоту.
   */
  mediaAspectClassName?: string;
}

/**
 * Аватар — единый бокс aspect-[3/4] независимо от того, есть фото или
 * нет: пока фото не задано, в том же боксе стоит заглушка с инициалами.
 * Так карточки с фото и без фото в одной секции остаются одной высоты.
 */
export function MemberContent({ member, mediaInset = false, mediaAspectClassName }: MemberContentProps) {
  const initials = getInitials(member.name);

  return (
    <>
      <div
        className={cn(
          "relative mb-7 aspect-[3/4] w-full shrink-0 overflow-hidden bg-rule",
          mediaInset ? "ui-media-inset" : "ui-media",
          mediaAspectClassName,
        )}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover grayscale"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-display text-h1 text-fg-muted"
          >
            {initials}
          </div>
        )}
      </div>

      <h3 className="font-display text-h3">{member.name}</h3>

      <p className="mt-2 text-caption font-medium uppercase text-fg-muted">
        {member.role}
      </p>
      <p className="mt-4 text-body text-fg-muted">{member.focus}</p>
      {/* mt-auto работает, только если родительский <li> сам flex-column
          (TeamList включает это через alignExperienceBottom) — иначе
          margin-top: auto по спецификации равен нулю, и отступ держит
          pt-5. Карточные раскладки (Cards и т.п.) сами оборачивают этот
          компонент в flex-колонку, там mt-auto работает всегда. */}
      <p className="tabular mt-auto pt-5 text-small text-fg-muted">
        {member.experience}
      </p>
    </>
  );
}

export default MemberContent;
