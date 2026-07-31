import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { revealDelay } from "@/lib/reveal";
import { COMPACT_H1 } from "../parts/headlineScale";
import type { HeroSection } from "@/types/site";

/**
 * Афиша во всю ширину окна: слева акцентная панель с текстом, справа
 * фото встык к краю экрана. Единственная раскладка hero без Container —
 * в этом и смысл, поэтому Section идёт со spacing="none", а отступы
 * держит сама панель.
 *
 * Как текст встаёт по одной оси с хедером. Панель занимает половину
 * ОКНА, а вся остальная страница живёт в контейнере 1240px, отбитом от
 * краёв. Если дать панели обычный px-gutter, её текст прижмётся к краю
 * экрана и разъедется с логотипом в хедере тем сильнее, чем шире монитор.
 * Поэтому внутри панели лежит блок шириной ровно в половину контейнера,
 * прижатый вправо (ml-auto): свободное место слева получается равным
 * внешнему полю контейнера, и левая ось страницы остаётся одна на всех.
 * На узких экранах, где контейнер уже упирается в края, calc даёт ту же
 * ширину, что и раньше, и правило вырождается в обычный паддинг.
 *
 * Вторая колонка — только фото: виджет на полноэкранной половине читался
 * бы как случайная карточка в пустоте. Без image вариант вырождается в
 * одну акцентную полосу (роутер об этом предупреждает).
 */
export function Billboard(props: HeroSection) {
  const {
    id,
    surface = "paper",
    badge,
    headline,
    lead,
    actions = [],
    image,
  } = props;

  return (
    <Section id={id} surface={surface} spacing="none">
      <div className="grid md:grid-cols-2 md:items-stretch">
        {/* Панель — собственный контекст поверхности: data-surface
            переопределяет цветовые переменные для всего поддерева, и
            текст, линейки и кнопки внутри сами становятся «на акценте».
            Ни одного цвета руками тут нет. */}
        <div
          data-surface="accent"
          className="bg-bg py-section-lg text-fg"
        >
          <div className="ml-auto w-full max-w-[calc(var(--container-page)/2)] px-gutter">
            {badge ? (
              <p
                className="text-caption font-medium uppercase text-fg-muted"
                data-reveal
              >
                {badge}
              </p>
            ) : null}

            {/* Заголовок тут свой, а не через HeroLede: на акцентной
                панели правило «последняя строка — акцентным курсивом»
                не работает, акцент по акценту не читается вовсе. Кегль
                при этом берётся из общего модуля, а не заводится заново. */}
            <h1
              className={`font-heading text-h1 ${badge ? "mt-7" : ""}`}
              style={COMPACT_H1}
              data-reveal
            >
              {headline.map((line, index) => (
                <span key={line} className="md:block">
                  {line}
                  {index < headline.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            {lead ? (
              <p
                className="mt-8 max-w-[46ch] text-lead text-fg-muted"
                data-reveal
                style={revealDelay(2)}
              >
                {lead}
              </p>
            ) : null}

            {actions.length > 0 ? (
              <div
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                data-reveal
                style={revealDelay(3)}
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
        </div>

        {image ? (
          // Высоту строки задаёт панель с текстом; фото просто
          // растягивается на неё (items-stretch + h-full) и кадрируется
          // object-cover. Отдельная min-height тут была бы вторым
          // источником правды о высоте первого экрана.
          <div className="relative min-h-[22rem] md:min-h-0">
            <Image
              src={image}
              alt={headline.join(" ")}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export default Billboard;
