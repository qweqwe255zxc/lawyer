import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/cn";
import { MemberContent } from "./MemberContent";
import type { TeamSection } from "@/types/site";

interface TeamListProps extends TeamSection {
  /** Сетка: 3 колонки (columns) или 1 (rows). */
  columns: "md:grid-cols-3" | "md:grid-cols-1";
  /**
   * Одна колонка роняет grid-cols-3 — без потолка ширины aspect-[3/4]
   * растягивается на всю ~1240px колонку контейнера и даёт портрет
   * ~1650px высотой. Тот же паттерн бага, что был у карты в ContactForm
   * при variant="stacked": вариант снял constraint, а зависимый
   * aspect-ratio блок на это не рассчитан.
   */
  avatarClassName?: string;
}

/**
 * Список людей на линейках — общий для раскладок columns и rows, они
 * отличаются только числом колонок и потолком ширины аватара.
 */
export function TeamList({
  columns,
  avatarClassName,
  number,
  eyebrow,
  title,
  lead,
  items,
}: TeamListProps) {
  return (
    <Container>
      <SectionHeader
        number={number}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
      />

      <ul className={cn("mt-14 grid gap-x-gutter md:mt-20", columns)}>
        {items.map((member, index) => (
          <li
            key={member.name}
            data-reveal
            style={revealDelay(index)}
            className={cn(
              "border-t border-rule pt-7",
              index > 0 && "mt-10 md:mt-0",
            )}
          >
            <MemberContent member={member} avatarClassName={avatarClassName} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default TeamList;
