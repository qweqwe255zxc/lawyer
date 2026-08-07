import { Features } from "@/components/sections/Features";
import { siteConfig } from "@/content/site.config";
import type { FeaturesSection } from "@/types/site";
import { QaBlock } from "../_lib";

const base = siteConfig.sections.find(
  (s): s is FeaturesSection => s.type === "features",
)!;

const variants: NonNullable<FeaturesSection["variant"]>[] = [
  "table",
  "cards",
  "bento",
];

export default function QaFeaturesPage() {
  return (
    <main>
      {variants.map((variant) => (
        <QaBlock key={variant} label={`Features / variant="${variant}"`}>
          <Features
            {...base}
            id={`features-${variant}`}
            variant={variant}
            iconShape={base.iconShape ?? siteConfig.theme.iconShape}
          />
        </QaBlock>
      ))}
    </main>
  );
}
