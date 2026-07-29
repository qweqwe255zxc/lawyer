import Image from "next/image";
import { Card } from "@/components/ui/Card";
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
 *
 * variant: columns — 3 колонки на линейках (база), rows — одна колонка,
 * cards — те же 3 колонки, но каждый человек в Card variant="framed".
 * Отдельный вариант, а не «включить карточки в columns», по той же
 * причине, что и везде: variant отвечает за раскладку, глубину внутри
 * карточки задаёт тариф. Без cards у секции нет ни одного объекта, на
 * котором глубина «Стандарта» была бы видна, — поэтому в этом тарифе
 * cards и стоит умолчанием (см. lib/preset.ts).
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

  const isCards = variant === "cards";

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
            variant === "rows" ? "md:grid-cols-1" : "md:grid-cols-3",
            isCards && "gap-gutter",
          )}
        >
          {items.map((member, index) => {
            const nameParts = member.name.split(" ");
            const initials = `${nameParts[1]?.[0] ?? ""}${nameParts[0]?.[0] ?? ""}`.toUpperCase();

            const body = (
              <>
                <div
                  className={cn(
                    "ui-media relative mb-7 aspect-[3/4] w-full overflow-hidden bg-rule",
                    // variant="rows" роняет grid-cols-3 до grid-cols-1 — без
                    // потолка ширины aspect-[3/4] растягивается на всю
                    // ~1240px колонку контейнера и даёт портрет ~1650px
                    // высотой. Тот же паттерн бага, что был у карты в
                    // ContactForm при variant="stacked": вариант снял
                    // constraint (grid-cols-3), а зависимый aspect-ratio
                    // блок на это не рассчитан.
                    variant === "rows" && "max-w-xs",
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

            return isCards ? (
              <li key={member.name}>
                <Card variant="framed" className="h-full">
                  <div data-reveal style={revealDelay(index)}>
                    {body}
                  </div>
                </Card>
              </li>
            ) : (
              <li
                key={member.name}
                data-reveal
                style={revealDelay(index)}
                className={cn(
                  "border-t border-rule pt-7",
                  index > 0 && "mt-10 md:mt-0",
                )}
              >
                {body}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export default Team;
