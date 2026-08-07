import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { bentoSpan, bentoMediaAspect } from "@/lib/bentoSpan";
import { cn } from "@/lib/cn";
import { MemberSocial } from "../parts/MemberSocial";
import { TeamBannerBlock } from "../parts/TeamBannerBlock";
import type { TeamSection } from "@/types/site";

/**
 * Заголовок слева + фото справа (та же раскладка, что у About), дальше —
 * сетка людей: первый — крупный на всю ширину ячейки, с именем/ролью
 * поверх фото (тёмный градиент снизу, как у Stats/variants/Photo.tsx),
 * остальные — сетка со спанами из `lib/bentoSpan.ts` (растягивается на
 * 2 слота только когда это ровно закрывает ряд).
 */
export function Bento(props: TeamSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, image, items, banner } = props;
  const [first, ...rest] = items;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="grid gap-x-gutter gap-y-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            {number ? (
              <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
                {number}
              </p>
            ) : null}
            {eyebrow ? (
              <p className="mt-2 text-caption font-medium uppercase text-accent" data-reveal>
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 font-heading text-h1" data-reveal>
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-4 text-body text-fg-muted" data-reveal>
                {lead}
              </p>
            ) : null}
          </div>

          {image ? (
            <div className="ui-media-raised relative aspect-[4/3] w-full overflow-hidden md:col-span-7">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          ) : null}
        </div>

        {first ? (
          <div className="mt-10 md:mt-14" data-reveal>
            <Card
              variant="framed"
              padded={false}
              className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]"
              // Без фото имя/роль (жёстко светлый text-paper поверх
              // градиента) остаются на обычной светлой поверхности карточки —
              // data-surface="ink" даёт тёмный --card-bg, на котором этот
              // текст читается так же, как поверх фото.
              data-surface={first.photo ? undefined : "ink"}
            >
              {first.photo ? (
                <Image
                  src={first.photo}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover grayscale"
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-7 md:p-9">
                <p className="text-caption font-medium uppercase text-paper/70">
                  {first.role}
                </p>
                <h3 className="mt-1 font-display text-h2 text-paper">{first.name}</h3>
                <p className="mt-2 max-w-[52ch] text-small text-paper/80">{first.focus}</p>
                <MemberSocial items={first.social} />
              </div>
            </Card>
          </div>
        ) : null}

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rest.map((member, index) => (
            <li
              key={member.name}
              data-reveal
              style={revealDelay(index)}
              className={bentoSpan(index, rest.length, { sm: 2, lg: 3, xl: 4 })}
            >
              <Card
                variant="framed"
                padded={false}
                className={cn(
                  "relative overflow-hidden",
                  bentoMediaAspect(index, rest.length, { sm: 2, lg: 3, xl: 4 }, "3/4"),
                )}
                data-surface={member.photo ? undefined : "ink"}
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover grayscale"
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-5">
                  <p className="text-caption font-medium uppercase text-paper/70">
                    {member.role}
                  </p>
                  <h3 className="mt-1 font-display text-h4 text-paper">{member.name}</h3>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        {banner ? <TeamBannerBlock banner={banner} tone="quote" className="mt-12 md:mt-16" /> : null}
      </Container>
    </Section>
  );
}

export default Bento;
