import { Fragment, type ReactNode } from "react";
import { CTA } from "@/components/sections/CTA";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Stats } from "@/components/sections/Stats";
import { Steps } from "@/components/sections/Steps";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import type { ContactsConfig, Section, SectionType } from "@/types/site";

/** Данные сайта, которые нужны секциям помимо их собственных. */
export interface RenderContext {
  contacts: ContactsConfig;
}

type Renderer<K extends SectionType> = (
  section: Extract<Section, { type: K }>,
  context: RenderContext,
) => ReactNode;

/**
 * Реестр: тип секции из конфига → компонент, который её рендерит.
 * Чтобы добавить новую секцию — новый тип в types/site.ts и строка тут,
 * больше нигде трогать не надо.
 */
const registry: { [K in SectionType]: Renderer<K> } = {
  hero: (section) => <Hero {...section} />,
  stats: (section) => <Stats {...section} />,
  features: (section) => <Features {...section} />,
  steps: (section) => <Steps {...section} />,
  gallery: (section) => <Gallery {...section} />,
  testimonials: (section) => <Testimonials {...section} />,
  team: (section) => <Team {...section} />,
  faq: (section) => <FAQ {...section} />,
  pricing: (section) => <Pricing {...section} />,
  cta: (section) => <CTA {...section} />,
  contact: (section, context) => (
    <ContactForm {...section} contacts={context.contacts} />
  ),
};

interface SectionRendererProps {
  sections: Section[];
  context: RenderContext;
}

export function SectionRenderer({ sections, context }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const render = registry[section.type] as Renderer<SectionType>;

        if (!render) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[SectionRenderer] Нет компонента для типа секции: ${section.type}`,
            );
          }
          return null;
        }

        return (
          <Fragment key={section.id}>{render(section, context)}</Fragment>
        );
      })}
    </>
  );
}

export default SectionRenderer;
