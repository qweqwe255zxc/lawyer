import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { StepsHeader } from "../parts/StepsHeader";
import type { StepsSection } from "@/types/site";

/**
 * Горизонтальный таймлайн: линия под рядом круглых нод-иконок, заголовок
 * и описание центрированы под каждой нодой. Первая нода — с акцентным
 * кольцом: это статичный акцент «с чего всё начинается», а не состояние
 * прогресса (в данных нет понятия «текущий шаг»). (Раньше назывался
 * просто "timeline" — рядом с "numbered-nodes", вертикальным таймлайном
 * с тем же смыслом, но никак не намекавшим на родство; теперь оба явно
 * timeline-*.)
 *
 * Нода намеренно не читает ThemeConfig.iconShape/SectionBase.iconShape:
 * это не плашка-иконка, а маркер на оси таймлайна, и ей нужен
 * непрозрачный фон, чтобы перекрывать линию под собой — bare сломал бы
 * саму метафору (сквозь ноду была бы видна линия). Круглая форма —
 * часть той же метафоры (нода = точка на линии), не решение про иконки.
 */
export function TimelineHorizontal(props: StepsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, headerAlign } = props;

  return (
    <Section id={id} surface={surface}>
      <Container>
        <StepsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align={headerAlign}
          className="mb-14 md:mb-20"
        />

        {/* Ось — соседний div, а не ребёнок ol: <ol> по спеке принимает
            только <li> (+ script/template), поэтому "relative" переехал
            на эту обёртку, а не остался на самом ol. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden h-px bg-rule lg:block"
          />

          <ol className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);
              const isFirst = index === 0;

              return (
                <li
                  key={item.number}
                  data-reveal
                  style={revealDelay(index)}
                  className="relative text-center"
                >
                  <span
                    className={cn(
                      "relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border bg-card",
                      isFirst ? "border-2 border-accent" : "border-rule",
                    )}
                  >
                    {Icon ? (
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn("size-5", isFirst ? "text-accent" : "text-fg-muted")}
                      />
                    ) : null}
                  </span>

                  <h3 className="mx-auto mt-4 max-w-[22ch] font-display text-h4">
                    {item.number}. {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[26ch] text-small text-fg-muted">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

export default TimelineHorizontal;
