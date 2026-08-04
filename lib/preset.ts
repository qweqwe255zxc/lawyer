import type {
  ContactSection,
  FaqSection,
  FeaturesSection,
  GallerySection,
  HeroSection,
  Preset,
  PricingSection,
  StatsSection,
  StepsSection,
  TeamSection,
  TestimonialsSection,
} from "@/types/site";

/**
 * ТАРИФ → РАСКЛАДКИ ПО УМОЛЧАНИЮ.
 *
 * Зачем это существует. Пресет (theme.preset) меняет две разные вещи:
 *
 *   1. Пластику — тени, радиусы, поверхности, подсветку. Это чистый CSS:
 *      data-preset на <html> + блоки [data-preset=...] в theme/tokens.css.
 *      Компоненты об этом не знают вообще.
 *   2. Раскладку — таблица услуг или карточки, реестр или сетка, полоса
 *      статистики или блок. Это выбор variant, и CSS его сделать не может.
 *
 * Раньше (2) полностью лежало на человеке/агенте, который пишет
 * site.config.ts: в документации было написано «для Стандарта поставьте
 * variant: cards», и если это забывали — сайт выходил плоским, потому что
 * табличная раскладка тени взять неоткуда. Теперь дефолт раскладки берётся
 * отсюда: секция без variant в конфиге получает вариант СВОЕГО ТАРИФА, а
 * не всегда экономовский. Явно указанный в конфиге variant по-прежнему
 * главнее — таблица ниже задаёт только умолчание.
 *
 * Модуль намеренно не импортирует site.config: значение пресета приезжает
 * в SectionRenderer через RenderContext из page.tsx. Иначе конфиг целиком
 * попал бы в клиентский бандл вместе с ContactForm ("use client").
 */

type SectionDefaults = {
  hero: NonNullable<HeroSection["variant"]>;
  stats: NonNullable<StatsSection["variant"]>;
  statsContainer: NonNullable<StatsSection["containerVariant"]>;
  features: NonNullable<FeaturesSection["variant"]>;
  steps: NonNullable<StepsSection["variant"]>;
  gallery: NonNullable<GallerySection["variant"]>;
  testimonials: NonNullable<TestimonialsSection["variant"]>;
  team: NonNullable<TeamSection["variant"]>;
  pricing: NonNullable<PricingSection["variant"]>;
  faq: NonNullable<FaqSection["variant"]>;
  contact: NonNullable<ContactSection["variant"]>;
  contactLayout: NonNullable<ContactSection["layout"]>;
};

export const PRESET_DEFAULTS: Record<Preset, SectionDefaults> = {
  /**
   * Эконом — то, что шаблон делал всегда: плотные табличные раскладки,
   * линейки вместо карточек, реестр вместо плитки.
   */
  econom: {
    hero: "type-only",
    stats: "band",
    statsContainer: "flat",
    features: "table",
    steps: "rail",
    gallery: "table",
    testimonials: "quotes",
    team: "columns",
    pricing: "table",
    faq: "narrow",
    contact: "split",
    contactLayout: "plain",
  },

  /**
   * Стандарт — всё, что может быть карточкой, становится карточкой:
   * только у карточки есть собственная поверхность, тень и радиус, то
   * есть только на ней вообще видно глубину, которую даёт пресет.
   * Табличная раскладка в этом тарифе — почти всегда ошибка.
   */
  standard: {
    hero: "split",
    stats: "grid",
    statsContainer: "elevated",
    features: "cards",
    steps: "timeline-vertical",
    gallery: "grid",
    testimonials: "cards",
    team: "cards",
    pricing: "cards",
    faq: "narrow",
    contact: "split",
    contactLayout: "cardContainer",
  },

  /**
   * Premium — дорого через воздух и рамку, а не через тень: раскладки
   * ближе к Экономy, но карточки получают акцентную рамку и минимальный
   * радиус (это уже сделано токенами, см. [data-preset="premium"]).
   */
  premium: {
    hero: "split",
    stats: "band",
    statsContainer: "bordered",
    features: "cards",
    steps: "stack",
    gallery: "table",
    testimonials: "quotes",
    team: "columns",
    pricing: "cards",
    faq: "narrow",
    contact: "split",
    contactLayout: "plain",
  },
};

/** Дефолтные раскладки для конкретного тарифа. */
export function presetDefaults(preset: Preset): SectionDefaults {
  return PRESET_DEFAULTS[preset] ?? PRESET_DEFAULTS.econom;
}

/* --------------------------------------------------------------------------
   Проверка «плоских» вариантов в дорогом тарифе.

   Дефолты выше срабатывают, только если variant в конфиге НЕ указан. А в
   реальности конфиг почти всегда копируют с готового примера, где variant
   проставлен у каждой секции — и тогда «Стандарт» снова собирается из
   табличных раскладок: тень и радиус в них физически некуда положить,
   рамки там рисует grid, а не объект. Именно так и получался «Стандарт,
   неотличимый от Эконома».

   Поэтому: при preset="standard" явно указанный плоский вариант — почти
   всегда ошибка, и в dev о ней говорится вслух, с готовой заменой.
   Тот же приём с console.warn, что у Features/Pricing при photo в
   табличной раскладке. В проде проверка не выполняется вообще.
   -------------------------------------------------------------------------- */

/** Варианты, у которых нет ни одного объекта, способного принять глубину. */
const FLAT_VARIANTS: Partial<Record<string, { values: string[]; use: string }>> =
  {
    features: { values: ["table"], use: 'variant: "cards"' },
    pricing: { values: ["table"], use: 'variant: "cards"' },
    steps: { values: ["rail", "stack"], use: 'variant: "timeline-vertical"' },
    testimonials: { values: ["quotes"], use: 'variant: "cards"' },
    team: { values: ["columns", "rows"], use: 'variant: "cards"' },
  };

export function warnFlatVariant(
  preset: Preset,
  type: string,
  id: string,
  variant: string | undefined,
  extra?: { key: string; value: string | undefined; flat: string; use: string },
): void {
  if (process.env.NODE_ENV === "production" || preset !== "standard") return;

  const rule = FLAT_VARIANTS[type];
  if (rule && variant && rule.values.includes(variant)) {
    console.warn(
      `[preset] Секция "${id}" (${type}): variant="${variant}" — плоская раскладка ` +
        `в тарифе "standard". Глубину в ней показать негде. Поставьте ${rule.use} ` +
        `или уберите variant совсем — тогда возьмётся вариант тарифа. ` +
        `См. docs/presets.md.`,
    );
  }

  if (extra && extra.value === extra.flat) {
    console.warn(
      `[preset] Секция "${id}" (${type}): ${extra.key}="${extra.flat}" — плоско ` +
        `для тарифа "standard". Поставьте ${extra.use} или уберите поле совсем. ` +
        `См. docs/presets.md.`,
    );
  }
}
