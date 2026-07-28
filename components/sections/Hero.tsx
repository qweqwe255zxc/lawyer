import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import type { HeroSection } from "@/types/site";

/**
 * Самая разреженная секция на сайте, без картинок и графики —
 * держится на крупной серифной типографике и колонтитуле на поле.
 * variant="split" с заданным image — исключение, добавляет фото рядом
 * с заголовком; без image всегда падает обратно на type-only.
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
  } = props;

  const isSplit = variant === "split" && Boolean(image);

  return (
    <Section id={id} surface={surface} spacing="lg">
      <Container>
        <div className="grid gap-x-gutter md:grid-cols-12">
          {/* Левое поле: номер раздела и вертикальный колонтитул */}
          <div className="md:col-span-2">
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

          {isSplit ? (
            // Текстовая колонка — col-span-6 (не 5): при заголовке из
            // нескольких слов на строку (например «Хороший кофе») крупный
            // --size-h1 (до 96px) не помещался в узкую 5-колоночную ширину
            // и переносился ВНУТРИ уже готовой ручной строки — три строки
            // из headline превращались в 4-5 визуальных строк, секция
            // раздувалась по высоте, и actions уезжали за пределы экрана
            // при заходе на сайт. col-span-6 даёт заметно больше места по
            // горизонтали для той же типографики.
            // Фото — col-span-4 col-start-9, встык к правому краю
            // контейнера (без пустой col-12): при text=6 не остаётся
            // лишней колонки под зеркальный отступ, как было при text=5;
            // pl-8/lg:pl-12 на этом div — единственный источник зазора
            // между текстом и фото (плюс стандартный gap-x-gutter).
            // Фото — в контейнере aspect-square, высота предсказуема и не
            // зависит от grid stretch (см. правило про aspect-ratio+фото
            // в docs/section-system.md).
            // Паддинг (зазор) — на внешнем grid-элементе; aspect-ratio и
            // overflow-hidden — на внутреннем боксе. Оба на одном div дали бы
            // paddig внутри самого aspect-ratio (border-box), и картинка
            // перестала бы быть квадратной — ширина уменьшилась бы на
            // паддинг, а высота считалась бы от полной ширины до паддинга.
            <div className="mt-10 self-center md:col-span-4 md:col-start-9 md:mt-0 md:pl-8 lg:pl-12">
              <div className="relative aspect-square w-full overflow-hidden rounded-doc-sm">
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
