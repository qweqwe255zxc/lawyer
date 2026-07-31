import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { COMPACT_H1 } from "../parts/headlineScale";
import { HeroOverlay } from "../parts/HeroOverlay";
import { HeroSearch } from "../parts/HeroSearch";
import { HeroTrust } from "../parts/HeroTrust";
import type { HeroSection } from "@/types/site";

/**
 * Первый экран сервиса с поиском: заголовок, лид, поисковая строка и ряд
 * доверия слева; фото с отзывом поверх — справа.
 *
 * Чем отличается от showcase, кроме содержимого: главное действие тут не
 * кнопка, а ПОЛЕ. Поэтому кнопок в этой раскладке нет вовсе (actions не
 * читаются) — вторая кнопка рядом с поиском отбирала бы у него внимание,
 * а первый экран должен предлагать ровно одно действие.
 *
 * Колонки 7/5, а не 6/6: слева живёт форма, которой нужна ширина, чтобы
 * поле и кнопка стояли в одну строку, а не переносились.
 *
 * Раскладка требует image: отзыв-оверлей физически лежит внутри бокса
 * фото, и без фото ему негде находиться (роутер предупреждает).
 */
export function Search(props: HeroSection) {
  const {
    id,
    surface = "paper",
    badge,
    headline,
    lead,
    image,
    search,
    trust,
    overlay,
  } = props;

  return (
    <Section id={id} surface={surface} spacing="lg" tint="hero">
      <Container>
        <div className="grid gap-x-gutter gap-y-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            {badge ? (
              <p
                className="text-caption font-medium uppercase text-fg-muted"
                data-reveal
              >
                {badge}
              </p>
            ) : null}

            <h1
              className={`font-heading text-h1 ${badge ? "mt-7" : ""}`}
              style={COMPACT_H1}
              data-reveal
            >
              {headline.map((line, index) => (
                <span key={line} className="md:block">
                  {index === headline.length - 1 ? (
                    <span className="font-heading italic text-accent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                  {index < headline.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            {lead ? (
              <p
                className="mt-8 max-w-[48ch] text-lead text-fg-muted"
                data-reveal
                style={revealDelay(1)}
              >
                {lead}
              </p>
            ) : null}

            {search ? (
              <div data-reveal style={revealDelay(2)}>
                <HeroSearch search={search} />
              </div>
            ) : null}

            {trust ? <HeroTrust trust={trust} /> : null}
          </div>

          {image ? (
            <div className="md:col-span-5">
              {/* relative — система координат для оверлея с отзывом.
                  Само фото в боксе с фиксированным форматом: оверлей
                  прижат к низу бокса, и «низ» обязан быть предсказуемым,
                  а не зависеть от пропорций конкретного файла. */}
              <div className="relative">
                <div className="ui-media-raised relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={headline.join(" ")}
                    fill
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {overlay ? <HeroOverlay overlay={overlay} /> : null}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default Search;
