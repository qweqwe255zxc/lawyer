import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/lib/reveal";
import { getInitials } from "../parts/initials";
import { TeamBannerBlock } from "../parts/TeamBannerBlock";
import type { TeamSection } from "@/types/site";

/**
 * Один человек — одна строка на всю ширину: фото во всю высоту строки
 * слева, содержимое справа. `md:items-stretch` на строке — фото и
 * текстовая колонка растягиваются до одной высоты (по самой высокой из
 * них), а не садятся по верхнему краю с фото произвольного роста.
 */
export function Rows(props: TeamSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, banner } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader number={number} eyebrow={eyebrow} title={title} lead={lead} />

        <ul className="mt-14 md:mt-20">
          {items.map((member, index) => {
            const initials = getInitials(member.name);

            return (
              <li
                key={member.name}
                data-reveal
                style={revealDelay(index)}
                className="border-t border-rule py-8 first:border-t-0 md:py-10"
              >
                <div className="grid gap-x-gutter gap-y-6 md:grid-cols-12 md:items-stretch">
                  <div className="ui-media relative aspect-[4/3] w-full overflow-hidden bg-rule md:col-span-4 md:aspect-auto">
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

                  <div className="flex flex-col justify-center md:col-span-8">
                    <h3 className="font-display text-h3">{member.name}</h3>
                    <p className="mt-2 text-caption font-medium uppercase text-fg-muted">
                      {member.role}
                    </p>
                    <p className="mt-4 max-w-[60ch] text-body text-fg-muted">{member.focus}</p>
                    <p className="tabular mt-4 text-small text-fg-muted">{member.experience}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {banner ? <TeamBannerBlock banner={banner} tone="soft" className="mt-12 md:mt-16" /> : null}
      </Container>
    </Section>
  );
}

export default Rows;
