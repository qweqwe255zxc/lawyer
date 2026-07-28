import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { TeamSection } from "@/types/site";

/**
 * Аватар — единый бокс aspect-[3/4] независимо от того, есть фото или
 * нет: пока фото не задано, в том же боксе стоит заглушка с инициалами.
 * Так карточки с фото и без фото в одной секции остаются одной высоты.
 */
export function Team(props: TeamSection) {
  const {
    id,
    surface = "paper",
    variant = "columns",
    number,
    eyebrow,
    title,
    lead,
    items,
  } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <ul
          className={cn(
            "mt-14 grid gap-x-gutter md:mt-20",
            variant === "columns" ? "md:grid-cols-3" : "md:grid-cols-1",
          )}
        >
          {items.map((member, index) => {
            const nameParts = member.name.split(" ");
            const initials = `${nameParts[1]?.[0] ?? ""}${nameParts[0]?.[0] ?? ""}`.toUpperCase();

            return (
            <li
              key={member.name}
              data-reveal
              style={revealDelay(index)}
              className={cn(
                "border-t border-rule pt-7",
                index > 0 && "mt-10 md:mt-0",
              )}
            >
              <div className="relative mb-7 aspect-[3/4] w-full overflow-hidden rounded-doc-sm bg-rule">
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
            </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export default Team;
