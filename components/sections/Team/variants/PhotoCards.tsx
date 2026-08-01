import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { MemberSocial } from "../parts/MemberSocial";
import { TeamBannerBlock } from "../parts/TeamBannerBlock";
import { TeamHeader } from "../parts/TeamHeader";
import type { TeamSection } from "@/types/site";

/**
 * Заголовок пилюлей по центру, карточки с фото во всю ширину (без
 * отступа сверху — Card padded={false}, текст в своей обёртке),
 * роль акцентом, имя, описание, `social`. Опциональный баннер снизу
 * (tone="soft").
 */
export function PhotoCards(props: TeamSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, banner, items } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <TeamHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className="mb-12 md:mb-16"
        />

        <ul className="grid gap-x-gutter gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((member, index) => (
            <li key={member.name} data-reveal style={revealDelay(index % 3)}>
              <Card variant="framed" padded={false} className="flex h-full flex-col overflow-hidden">
                <div className="ui-media relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-none bg-rule">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover grayscale"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="text-caption font-medium uppercase text-accent">
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-display text-h4">{member.name}</h3>
                  <p className="mt-3 text-small text-fg-muted">{member.focus}</p>

                  <div className="mt-auto pt-5">
                    <MemberSocial items={member.social} />
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        {banner ? <TeamBannerBlock banner={banner} tone="soft" className="mt-12 md:mt-16" /> : null}
      </Container>
    </Section>
  );
}

export default PhotoCards;
