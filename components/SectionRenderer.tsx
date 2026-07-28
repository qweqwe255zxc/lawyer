import { Fragment, type ReactNode } from "react";
import { About } from "@/components/sections/About";
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
 *
 * Импорты тут статические, и это осознанный выбор, а не недосмотр.
 * next/dynamic для этого реестра не помогает: registry[section.type] —
 * это выбор по строке из данных (site.config.ts), а бандлер решает, что
 * попадёт в чанк, по самому коду, а не по содержимому другого файла —
 * он не умеет доказать, что какой-то тип секции нигде не встретится
 * в конфиге, и потому не выкидывает его код. Проверено на сборке: даже
 * убрав секцию из site.config.ts, её JS остаётся в бандле что на
 * Turbopack, что на Webpack.
 *
 * У большинства секций (Hero, Stats, Features, Steps, Gallery,
 * Testimonials, Team, About, Pricing, CTA) нет собственного клиентского JS
 * вообще — это чистые Server Components, их код и так не попадает в
 * бандл браузера независимо от способа импорта. Единственные тяжёлые
 * по клиентскому JS — FAQ (через Accordion) и ContactForm (форма,
 * Toast, Select): их вес неизбежен, если секция реально есть на
 * странице.
 *
 * Если в конкретном проекте какой-то секции нет и не будет —
 * единственный способ реально не тащить её JS: удалить импорт и
 * строку в registry ниже руками в этом проекте. Автоматически
 * почистить это на основе одного только site.config.ts нельзя без
 * генерации файла под конкретный проект.
 *
 * Чтобы добавить новую секцию:
 * 1. Новый тип в types/site.ts.
 * 2. Компонент в components/sections/.
 * 3. Обычный import сверху + строка в registry ниже.
 */
const registry: { [K in SectionType]: Renderer<K> } = {
  hero: (section) => <Hero {...section} />,
  stats: (section) => <Stats {...section} />,
  features: (section) => <Features {...section} />,
  steps: (section) => <Steps {...section} />,
  gallery: (section) => <Gallery {...section} />,
  testimonials: (section) => <Testimonials {...section} />,
  team: (section) => <Team {...section} />,
  about: (section) => <About {...section} />,
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
