import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamBannerBlock } from "../parts/TeamBannerBlock";
import { TeamList } from "../parts/TeamList";
import type { TeamSection } from "@/types/site";

/** Три человека в ряд на линейках. Вариант по умолчанию в «Экономе». */
export function Columns(props: TeamSection) {
  const { id, surface = "paper", banner } = props;

  return (
    <Section id={id} surface={surface}>
      <TeamList {...props} />

      {banner ? (
        <Container>
          <TeamBannerBlock banner={banner} tone="soft" className="mt-12 md:mt-16" />
        </Container>
      ) : null}
    </Section>
  );
}

export default Columns;
