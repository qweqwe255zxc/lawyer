import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { revealDelay } from "@/lib/reveal";
import { StatsHeader } from "../parts/StatsHeader";
import type { StatsSection } from "@/types/site";

/**
 * Заголовок слева, дальше — плоские колонки на верхней линейке (та же
 * идея, что у Features variant="table"): иконка + подпись сверху, потом
 * фраза «число + suffix» одним куском («18» + « Years» → «18 Years») и
 * описание (text). suffix тут пишут с пробелом впереди — это слово
 * после числа, а не хвост вроде «%».
 */
export function Rows(props: StatsSection) {
  const { id, surface = "paper", number, eyebrow, title, lead, items, iconShape } = props;

  return (
    <Section id={id} surface={surface} iconShape={iconShape}>
      <Container>
        <StatsHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align="left"
          eyebrowStyle="plain"
          className="mb-12 md:mb-16"
        />

        <dl className="grid grid-cols-2 gap-x-gutter gap-y-10 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);

            return (
              <div
                key={item.label}
                data-reveal
                style={revealDelay(index)}
                className="border-t border-rule pt-6"
              >
                {/* min-h резервирует место под подпись в две строки: без
                    него разные по длине label сдвигали dd ниже на разную
                    высоту, и цифры «прыгали» между колонками одного ряда. */}
                <div className="flex min-h-10 items-start gap-2">
                  {Icon ? (
                    <span className="icon-tile mt-0.5 shrink-0">
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
                    </span>
                  ) : null}
                  <dt className="text-caption font-medium uppercase text-fg-muted">
                    {item.label}
                  </dt>
                </div>

                <dd className="mt-3 font-heading text-h3">
                  {item.value}
                  {item.suffix}
                </dd>

                {item.text ? (
                  <p className="mt-3 measure text-small text-fg-muted">{item.text}</p>
                ) : null}
              </div>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}

export default Rows;
