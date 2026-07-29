import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import type { HeroSection } from "@/types/site";

/** Полоса прогресса — данные, а не оформление: значение вне 0–100 подрезаем. */
function progressWidth(value: number): string {
  return `${Math.min(100, Math.max(0, value))}%`;
}

/**
 * Самая разреженная секция на сайте, без картинок и графики —
 * держится на крупной серифной типографике и колонтитуле на поле.
 * variant="split" с заданным image — исключение, добавляет фото рядом
 * с заголовком; без image всегда падает обратно на type-only.
 * widget (карточка с метриками, тариф «Стандарт») включает ту же
 * двухколоночную раскладку сам, без variant="split".
 */
export function Hero(props: HeroSection) {
  const {
    id,
    surface = "paper",
    variant = "type-only",
    number,
    rail,
    headline,
    lead,
    actions = [],
    facts = [],
    image,
    widget,
  } = props;

  const withImage = variant === "split" && Boolean(image);
  // Вторая колонка одна на двоих: фото и виджет за неё не дерутся —
  // фото было раньше и остаётся приоритетным, виджет в этом случае
  // не рендерится вовсе (тот же приём с dev-предупреждением, что
  // у Features/Pricing при photo в табличном варианте).
  const withWidget = Boolean(widget) && !withImage;

  if (process.env.NODE_ENV !== "production" && widget && withImage) {
    console.warn(
      `[Hero] Секция "${id}": widget и image заняли бы одну колонку — показано фото, widget пропущен.`,
    );
  }

  const isSplit = withImage || withWidget;

  return (
    <Section
      id={id}
      surface={surface}
      // spacing="lg" (дефолт секции, симметричный верх/низ) — только для
      // type-only. Для isSplit — spacing="none" + ручной pt/pb: нижний
      // отступ переиспользует тот же токен --space-section-lg (ритм перед
      // следующей секцией не меняется), верхний — уменьшен. С полным
      // --space-section-lg сверху (80–160px) плюс высота хедера hero с
      // высоким фото (см. явные md:h-[34rem]/lg:h-[40rem] на фото ниже)
      // прижимался к низу первого экрана, а не читался по центру. pt
      // здесь — фиксированные брейкпоинты, не clamp: это подгон под
      // конкретную высоту фото, а не самостоятельный токен ритма,
      // заводить новый --space-* под это не нужно. У type-only такой
      // проблемы нет (нет высокого фото, тянущего секцию за собой) —
      // там ничего не меняется. Виджет тоже не меняет: он заметно ниже
      // фото и в первый экран укладывается при обычном spacing="lg".
      spacing={withImage ? "none" : "lg"}
      // Единственная секция с усиленной фоновой подсветкой (--hero-tint).
      // В тарифе «Эконом» этот токен — none, то есть фон остаётся плоской
      // заливкой и hero не меняется; в «Стандарте» под заголовком
      // появляется мягкое акцентное свечение — то, что дороже всего
      // читается на первом экране и чего в шаблоне не было вообще.
      tint="hero"
      className={
        withImage ? "pt-8 pb-[var(--space-section-lg)] md:pt-10 lg:pt-14" : undefined
      }
    >
      <Container>
        <div
          className={cn(
            "grid gap-x-gutter md:grid-cols-12",
            // items-center только в isSplit: фото теперь заведомо выше
            // текстовой колонки (см. явную высоту на фото ниже) — при
            // дефолтном stretch все ячейки строки просто растягиваются
            // от общего верхнего края, и фото «прилипает» сверху, отчего
            // весь лишний рост уходит вниз. items-center вместо этого
            // центрирует ячейки внутри строки: фото (самое высокое) как
            // занимало всю высоту строки, так и занимает — визуально не
            // меняется, а текст (более низкий) сам сдвигается к
            // вертикальной середине, получая одинаковый отступ от фото
            // сверху и снизу. Это не зависит от точной высоты текста
            // (заголовок/лид могут быть длиннее или короче) — центрирует
            // браузер, а не пиксельный магический отступ. Рельсу
            // (числу/подписи слева) это не нужно — он ниже переопределён
            // обратно в self-start, чтобы остаться на исходном месте
            // вровень с началом заголовка, а не уехать к середине вместе
            // с текстом. У type-only строка одна и та же что и раньше
            // (default stretch) — там нет второй, более высокой колонки,
            // относительно которой имело бы смысл центрировать.
            isSplit && "md:items-center",
          )}
        >
          {/* Левое поле: номер раздела и вертикальный колонтитул.
              В isSplit — col-span-1 (не 2): рельс тут просто тонкая
              подпись сбоку, а не полноценный визуальный блок, поэтому
              на глаз он не читается как «левая граница» композиции —
              этой границей читается начало заголовка. Отдав рельсу
              лишнюю колонку раньше, мы визуально сдвигали весь контент
              (заголовок+фото) вправо: слева перед текстом оставался
              широкий «пустой» отступ под рельс, а справа фото упиралось
              прямо в край контейнера без такого же отступа — левая и
              правая граница читались неровно. При col-span-1 текст
              стартует на одну колонку раньше (и получает её ширину, см.
              col-span-6 ниже), сокращая этот перекос. В type-only —
              по-прежнему col-span-2, там нет фото и не с чем сравнивать
              границы.
              self-start (isSplit) — не даёт рельсу уехать к вертикальной
              середине вместе с items-center на строке, см. комментарий
              на самой строке выше. */}
          <div
            className={cn(
              isSplit ? "md:col-span-1" : "md:col-span-2",
              isSplit && "md:self-start",
            )}
          >
            <div className="mb-8 flex items-baseline gap-4 lg:hidden">
              {number ? (
                <span className="tabular text-caption font-medium uppercase text-fg-muted">
                  {number}
                </span>
              ) : null}
              {rail ? (
                <span className="text-caption font-medium uppercase text-fg-muted">
                  {rail}
                </span>
              ) : null}
            </div>

            <div
              className="hidden lg:flex lg:items-center lg:gap-5"
              style={{ writingMode: "vertical-rl" }}
              aria-hidden="true"
            >
              {number ? (
                <span className="tabular text-caption font-medium uppercase text-fg-muted">
                  {number}
                </span>
              ) : null}
              {rail ? (
                <span className="text-caption font-medium uppercase text-fg-muted">
                  {rail}
                </span>
              ) : null}
            </div>
          </div>

          <div className={isSplit ? "md:col-span-6" : "md:col-span-10"}>
            {/* Ручные переносы включаются только с md: на узком экране они
                дают висячие строки, там заголовок верстается потоком.
                В isSplit локально понижаем потолок --size-h1 (96px → 72px,
                минимум не трогаем): даже при col-span-6 (~600px) базовый
                --size-h1 иногда не оставляет места двум словам в одной
                ручной строке («Хороший кофе»), и она сама переносится
                внутри уже готовой строки — второй уровень переноса поверх
                авторского. --size-h1 — обычная CSS-переменная, override
                внутри поддерева переопределяет её только для isSplit,
                не трогая токен глобально (type-only и все остальные
                потребители text-h1 — Team, not-found — не затронуты). */}
            <h1
              className="font-heading text-h1"
              style={isSplit ? ({ "--size-h1": "clamp(2.125rem, 0.9rem + 4vw, 4.5rem)" } as React.CSSProperties) : undefined}
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
                className="mt-8 max-w-[52ch] text-lead text-fg-muted"
                data-reveal
                style={revealDelay(1)}
              >
                {lead}
              </p>
            ) : null}

            {actions.length > 0 ? (
              <div
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                data-reveal
                style={revealDelay(2)}
              >
                {actions.map((action) => (
                  <Button
                    key={action.href}
                    href={action.href}
                    variant={action.variant ?? "primary"}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>

          {withImage ? (
            // Текстовая колонка — col-span-6, стартует сразу после
            // укороченного рельса (col-span-1, см. комментарий выше) —
            // rail(1)+text(6)=7, фото начинается с col-start-8 без
            // разрыва. --size-h1 в isSplit по-прежнему ограничен 72px
            // (см. override на h1 выше), так что двум словам в одной
            // ручной строке («Хороший кофе») всё ещё есть куда поместиться.
            // Фото — col-span-5 col-start-8, встык к правому краю
            // контейнера: шире прежнего col-span-4 и без aspect-square.
            // Высота на md+ — явная (h-[…], не проценты и не min-height
            // на этой ячейке): фото сознательно выше текстовой колонки, а
            // items-center на строке (см. комментарий на grid-контейнере
            // выше) центрирует более низкие соседние ячейки (текст)
            // относительно фото — не наоборот. Именно поэтому явная
            // высота стоит на ВНУТРЕННЕМ боксе, а не как min-height на
            // внешней grid-ячейке: раньше (min-height + stretch) фото
            // растягивалось от общего верхнего края строки, и весь
            // лишний рост уходил только вниз. Это НЕ тот же баг, что
            // чинили в Features/Pricing/Team/ContactForm — там
            // aspect-ratio-бокс оставался без потолка ШИРИНЫ, когда
            // вариант ронял grid-cols-N; здесь ширина всегда ограничена
            // сеткой (col-span-5 в grid-cols-12), а высота — фиксированное
            // число, а не выведенная из чего-то способного расти
            // бесконтрольно.
            // На мобильном (<md) грид схлопывается в одну колонку, там
            // высоту держит aspect-square (md:aspect-auto его снимает).
            // pl-8/lg:pl-12 на этом div — единственный источник зазора
            // между текстом и фото (плюс стандартный gap-x-gutter).
            // Паддинг (зазор) — на внешнем grid-элементе; overflow-hidden —
            // на внутреннем боксе, чтобы паддинг не резал скругление.
            <div className="mt-10 md:col-span-5 md:col-start-8 md:mt-0 md:pl-8 lg:pl-12">
              <div className="ui-media-raised relative aspect-square w-full overflow-hidden md:aspect-auto md:h-[34rem] lg:h-[40rem]">
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
            // Виджет живёт в той же колонке, что и фото (col-span-5 /
            // col-start-8), но без явной высоты: карточка ровно такая,
            // какой её делает содержимое, а по вертикали её центрирует
            // items-center на строке.
            // hidden md:block — сознательно: на мобильном грид схлопнут
            // в одну колонку, и карточка встала бы между лидом и
            // кнопками, уводя CTA за первый экран. Метрики виджета —
            // витрина, а не единственный источник этих чисел: если они
            // нужны и на мобильном, для этого есть facts (ниже) и
            // секция stats.
            <div
              className="hidden md:col-span-5 md:col-start-8 md:block md:pl-8 lg:pl-12"
              data-reveal
              style={revealDelay(1)}
            >
              <Card variant="elevated">
                {widget.badge ? (
                  <Badge variant="soft" className="mb-5">
                    {widget.badge}
                  </Badge>
                ) : null}

                <p className="font-display text-h3">{widget.title}</p>

                <dl className="mt-7 space-y-6">
                  {widget.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-small text-fg-muted">
                          {metric.label}
                        </dt>
                        <dd className="tabular font-display text-h3">
                          {metric.value}
                        </dd>
                      </div>

                      {typeof metric.progress === "number" ? (
                        // Значение продублировано текстом в <dd> выше,
                        // поэтому полоса — чистая графика (aria-hidden),
                        // а не progressbar, который скринридер прочитает
                        // вторым голосом то же самое.
                        <div
                          aria-hidden="true"
                          className="mt-3 h-1 w-full overflow-hidden rounded-pill bg-rule"
                        >
                          <span
                            className="block h-full rounded-pill bg-accent"
                            style={{ width: progressWidth(metric.progress) }}
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </Card>
            </div>
          ) : null}
        </div>

        {/* «Шапка дела»: три факта через вертикальные линейки */}
        {facts.length > 0 ? (
          <dl
            className="mt-16 grid border-t border-rule sm:grid-cols-3 md:mt-24"
            data-reveal
            style={revealDelay(3)}
          >
            {facts.map((fact, index) => (
              <div
                key={fact.value}
                className={
                  index === 0
                    ? "py-6 sm:pr-8"
                    : "border-t border-rule py-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pr-8"
                }
              >
                <dt className="font-display text-h3">{fact.value}</dt>
                <dd className="mt-2 text-small text-fg-muted">{fact.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </Section>
  );
}

export default Hero;
