import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { HeroFacts } from "../parts/HeroFacts";
import { HeroLede } from "../parts/HeroLede";
import { HeroRail } from "../parts/HeroRail";
import { HeroWidget } from "../parts/HeroWidget";
import { resolveHeroLayout } from "../parts/resolveHeroLayout";
import type { HeroSection } from "@/types/site";

/**
 * Двухколоночный hero: рельс (1) + текст (6) + визуал (5).
 * Визуал — фото ИЛИ карточка метрик, см. resolveHeroLayout.
 *
 * Рельс тут col-span-1, а не 2: он просто тонкая подпись сбоку, а не
 * визуальный блок, и на глаз не читается как левая граница композиции —
 * ею читается начало заголовка. При col-span-2 слева перед текстом
 * оставался широкий пустой отступ, а справа фото упиралось прямо в край
 * контейнера — границы читались неровно.
 *
 * items-center на строке: фото заведомо выше текстовой колонки (у него
 * явная высота, см. ниже). При дефолтном stretch все ячейки тянутся от
 * общего верхнего края, и весь лишний рост уходит вниз. items-center
 * центрирует более низкую ячейку (текст) относительно более высокой
 * (фото), причём браузером, а не магическим отступом. Рельсу это не
 * нужно — он переопределён обратно в self-start, чтобы остаться вровень
 * с началом заголовка.
 */
export function Split(props: HeroSection) {
  const {
    id,
    surface = "paper",
    number,
    rail,
    headline,
    lead,
    actions = [],
    facts = [],
    image,
    widget,
    hideMediaOnMobile,
  } = props;

  const { withImage, withWidget } = resolveHeroLayout(props);

  return (
    <Section
      id={id}
      surface={surface}
      // Для фото — spacing="none" плюс ручной pt/pb: нижний отступ
      // переиспользует тот же токен --space-section-lg (ритм перед
      // следующей секцией не меняется), верхний уменьшен. С полным
      // --space-section-lg сверху (80–160px) плюс высота хедера hero с
      // высоким фото прижимался к низу первого экрана, а не читался по
      // центру. pt тут — фиксированные брейкпоинты, а не clamp: это
      // подгон под конкретную высоту фото, а не самостоятельный токен
      // ритма. Виджет заметно ниже фото и в первый экран укладывается
      // при обычном spacing="lg".
      //
      // Хедер теперь fixed поверх hero (не резервирует высоту в потоке —
      // до скролла он прозрачный и лежит прямо над этой секцией), поэтому
      // к прежним pt-8/10/14 обязательно прибавлен --header-height:
      // раньше эти же 72px давал сам хедер своим местом в потоке, теперь
      // их даёт только этот отступ.
      spacing={withImage ? "none" : "lg"}
      tint="hero"
      className={
        withImage
          ? "pt-[calc(var(--header-height)+2rem)] pb-[var(--space-section-lg)] md:pt-[calc(var(--header-height)+2.5rem)] lg:pt-[calc(var(--header-height)+3.5rem)]"
          : undefined
      }
    >
      <Container>
        <div className="grid gap-x-gutter md:grid-cols-12 md:items-center">
          <HeroRail
            number={number}
            rail={rail}
            className="md:col-span-1 md:self-start"
          />

          <HeroLede
            headline={headline}
            lead={lead}
            actions={actions}
            compact
            className="md:col-span-6"
          />

          {withImage ? (
            // Фото — col-span-5 col-start-8, встык к правому краю
            // контейнера: rail(1)+text(6)=7, разрыва нет. Высота на md+
            // явная и стоит на ВНУТРЕННЕМ боксе, а не min-height на
            // grid-ячейке: при min-height + stretch фото растягивалось от
            // общего верхнего края строки и весь лишний рост уходил вниз.
            // На мобильном грид схлопывается в одну колонку, там высоту
            // держит aspect-square (md:aspect-auto его снимает).
            // pl-8/lg:pl-12 — единственный источник зазора между текстом и
            // фото (плюс стандартный gap-x-gutter). Паддинг на внешнем
            // grid-элементе, overflow-hidden на внутреннем боксе, чтобы
            // паддинг не резал скругление.
            <div
              className={cn(
                "mt-10 md:col-span-5 md:col-start-8 md:mt-0 md:pl-10 lg:pl-16",
                hideMediaOnMobile && "hidden md:block",
              )}
            >
              <div className="ui-media-raised relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-[34rem] lg:h-[40rem]">
                <Image
                  src={image as string}
                  alt={headline.join(" ")}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                  data-reveal
                  style={revealDelay(1)}
                />
              </div>
            </div>
          ) : null}

          {withWidget && widget ? (
            // Виджет живёт в той же колонке, что и фото, но без явной
            // высоты: карточка ровно такая, какой её делает содержимое, а
            // по вертикали её центрирует items-center на строке.
            // hidden md:block — сознательно: на мобильном грид схлопнут в
            // одну колонку, и карточка встала бы между лидом и кнопками,
            // уводя CTA за первый экран. Метрики виджета — витрина, а не
            // единственный источник этих чисел: для мобильного есть facts
            // ниже и секция stats.
            <div
              className="hidden md:col-span-5 md:col-start-8 md:block md:pl-10 lg:pl-16"
              data-reveal
              style={revealDelay(1)}
            >
              <HeroWidget widget={widget} />
            </div>
          ) : null}
        </div>

        <HeroFacts facts={facts} />
      </Container>
    </Section>
  );
}

export default Split;
