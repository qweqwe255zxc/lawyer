import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import type { TeamSection } from "@/types/site";

/**
 * Фото рендерим, только если оно реально есть в конфиге. Пока фото нет,
 * под именем стоит круглая заглушка с инициалами — место под будущий портрет.
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
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`${member.name} — ${member.role}`}
                  width={480}
                  height={600}
                  className="mb-7 w-full rounded-doc-sm object-cover grayscale"
                />
              ) : null}

              <h3 className="font-display text-h3">{member.name}</h3>

              <div
                aria-hidden="true"
                className="mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-rule text-body font-medium text-fg-muted"
              >
                {initials}
              </div>

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
