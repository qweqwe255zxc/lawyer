import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/types/site";

interface MemberContentProps {
  member: TeamMember;
  /** Ограничение ширины аватара — нужно только раскладке в одну колонку. */
  avatarClassName?: string;
}

/**
 * Аватар — единый бокс aspect-[3/4] независимо от того, есть фото или
 * нет: пока фото не задано, в том же боксе стоит заглушка с инициалами.
 * Так карточки с фото и без фото в одной секции остаются одной высоты.
 */
export function MemberContent({ member, avatarClassName }: MemberContentProps) {
  const nameParts = member.name.split(" ");
  const initials =
    `${nameParts[1]?.[0] ?? ""}${nameParts[0]?.[0] ?? ""}`.toUpperCase();

  return (
    <>
      <div
        className={cn(
          "ui-media relative mb-7 aspect-[3/4] w-full overflow-hidden bg-rule",
          avatarClassName,
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
      <p className="tabular mt-5 text-small text-fg-muted">
        {member.experience}
      </p>
    </>
  );
}

export default MemberContent;
