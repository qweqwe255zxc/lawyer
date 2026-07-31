import type { IconName } from "@/lib/icons";

// Типы конфига сайта. Секция = данные + surface + variant.
// Компоненты текст не хранят, всё приходит сюда пропсами из site.config.ts.

/** Фон секции, задаёт цвета через CSS-переменные (paper/surface/ink/accent). */
export type Surface = "paper" | "surface" | "ink" | "accent";

/**
 * Тариф оформления. Единственная ручка, которой «дорогой» сайт отличается
 * от базового — см. docs/presets.md.
 *
 * econom   — плоско и документно: линейки вместо карточек, теней нет,
 *            радиус 4px. То, чем шаблон был до появления пресетов.
 * standard — глубина: карточки на собственной поверхности, многослойные
 *            тени, крупные скругления, подсветка секций, плашки под
 *            иконками, живой hover, стеклянный хедер.
 * premium  — тоже дорого, но через воздух и акцентную рамку: теней нет,
 *            радиус минимальный.
 *
 * Влияет на две вещи сразу: на токены (data-preset на <html> →
 * theme/tokens.css) и на дефолтные variant секций (lib/preset.ts).
 */
export type Preset = "econom" | "standard" | "premium";

export interface SectionBase {
  /** Используется как anchor и как key, плюс scroll-margin-top под sticky-хедер. */
  id: string;
  surface?: Surface;
  /** Номер раздела на поле: «01», «02»… Пустая строка — не выводится. */
  number?: string;
  /** Колонтитул над заголовком. */
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** Если задано — пункт появляется в навигации хедера. */
  nav?: string;
}

export interface CtaLink {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "quiet";
}

// Hero

export interface HeroFact {
  value: string;
  label: string;
}

export interface HeroWidgetMetric {
  label: string;
  value: string;
  /** 0–100. Если задано — под строкой появляется полоса прогресса. */
  progress?: number;
}

/**
 * Столбиковая диаграмма в виджете hero.
 *
 * values — высоты столбцов в процентах (0–100), значения вне диапазона
 * подрезаются. Это витрина динамики, а не график с осями: подписей у
 * столбцов нет и не предполагается, поэтому диаграмма помечена
 * aria-hidden — ровно как полоса прогресса у метрики. Всё, что должно
 * быть озвучено, обязано быть в metrics или в caption.
 */
export interface HeroWidgetChart {
  /** Подпись под диаграммой — единственный её озвучиваемый текст. */
  caption?: string;
  values: number[];
  /** Индекс выделенного акцентом столбца. */
  peakIndex?: number;
}

/** Карточка с метриками рядом с заголовком (тариф «Стандарт»). */
export interface HeroWidget {
  badge?: string;
  title: string;
  metrics: HeroWidgetMetric[];
  /**
   * Как разложены метрики.
   * list (по умолчанию) — строками «подпись — значение», как в обычном
   *   виджете: годится для длинных подписей и любого их числа.
   * tiles — плитками в две колонки: крупное значение под короткой
   *   подписью. Требует коротких значений («24,5 млн», «12,4») —
   *   длинные в плитке переносятся и ломают ряд.
   */
  layout?: "list" | "tiles";
  chart?: HeroWidgetChart;
}

/** Поисковая строка в hero (variant="search"). */
export interface HeroSearch {
  /** Подпись над полем — она же <label> поля, а не плейсхолдер. */
  label: string;
  placeholder?: string;
  submitLabel: string;
  /** URL обработчика: форма уходит туда обычным GET. */
  action: string;
  /** Имя параметра запроса, по умолчанию "q". */
  name?: string;
}

/** Строка «нам доверяют» с логотипами-иконками (variant="search"). */
export interface HeroTrust {
  text: string;
  items: { label: string; icon?: IconName }[];
}

/**
 * Отзыв, лежащий поверх фото в первом экране (variant="search").
 * rating — число закрашенных звёзд из пяти; значения вне 0–5 подрезаются.
 */
export interface HeroOverlay {
  rating?: number;
  quote: string;
  author: string;
  role?: string;
}

/**
 * Строка доверия под кнопками hero: стопка аватаров и короткая фраза.
 * Читает только showcase.
 */
export interface HeroProof {
  /**
   * Локальные пути к фото (`/images/...`), как и любые картинки в
   * шаблоне — см. docs/section-system.md, раздел 2. Рендерятся внахлёст,
   * не больше четырёх; остальные игнорируются.
   */
  avatars?: string[];
  text: string;
}

export interface HeroSection extends SectionBase {
  type: "hero";
  /**
   * type-only — голая типографика, рельс на левом поле.
   * split     — текст слева, фото или виджет справа, рельс на поле (1/6/5).
   * centered  — центрированная афиша на тёмной земле, без второй колонки
   *             (image и widget в ней не рендерятся).
   * showcase  — витрина продукта 6/6: плашка над заголовком, медиа в
   *             поднятой панели справа, рельса нет (number/rail не читаются).
   * billboard — афиша во всю ширину окна: акцентная панель с текстом
   *             слева, фото встык к краю экрана справа. Без Container,
   *             number/rail и widget не читаются, image обязателен.
   * search    — первый экран сервиса: поисковая строка вместо кнопок,
   *             ряд доверия, фото с отзывом поверх. actions не читаются,
   *             image обязателен.
   */
  variant?:
    | "type-only"
    | "split"
    | "centered"
    | "showcase"
    | "billboard"
    | "search";
  /**
   * Плашка-анонс над заголовком («Версия 2.0», «Набор открыт»).
   * Читает только showcase — в остальных раскладках её место занимает
   * рельс или колонтитул.
   */
  badge?: string;
  /**
   * Оправа медиа в панели showcase: plain — просто панель,
   * browser — с полосой окна сверху (витрина интерфейса, а не фото).
   * Без image не используется.
   */
  frame?: "plain" | "browser";
  /**
   * Строка доверия под кнопками (аватары + фраза). Читает только
   * showcase — в остальных раскладках роль социального доказательства
   * играют facts.
   */
  proof?: HeroProof;
  /**
   * Поисковая строка в первом экране. Читает только variant="search".
   * Это НАСТОЯЩАЯ форма method="get", а не декорация: значение уходит
   * на `action` обычным параметром запроса, без JS. Поэтому `action`
   * обязателен — страницу, которая примет запрос, должен предоставить
   * проект (каталог, поиск по сайту, внешний сервис). Формы, которая
   * молча съедает введённое, в шаблоне быть не должно.
   */
  search?: HeroSearch;
  /** Строка «нам доверяют» с логотипами. Читает только variant="search". */
  trust?: HeroTrust;
  /** Отзыв поверх фото. Читает только variant="search". */
  overlay?: HeroOverlay;
  /** Строки заголовка, переносы расставляем вручную. */
  headline: string[];
  actions?: CtaLink[];
  facts?: HeroFact[];
  /** Вертикальный колонтитул на левом поле. */
  rail?: string;
  /** Фон/фото для variant="split". Без variant="split" не используется. */
  image?: string;
  /**
   * Карточка с метриками во второй колонке. Включает ту же раскладку,
   * что и variant="split", даже если variant не задан. Если заданы и
   * image (при variant="split"), и widget — колонку занимает фото.
   * На мобильном виджет скрыт: он не должен уводить кнопки за экран.
   */
  widget?: HeroWidget;
}

// Stats

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface StatsSection extends SectionBase {
  type: "stats";
  variant?: "band" | "grid";
  /**
   * Подложка под цифрами: flat — полоса во всю ширину с линейками
   * сверху/снизу (база), elevated — единый блок с тенью,
   * bordered — блок с акцентной рамкой. Линейки секции при elevated
   * и bordered снимаются, иначе блок «перечёркнут» ими.
   */
  containerVariant?: "flat" | "elevated" | "bordered";
  items: StatItem[];
}

// Features

export interface FeatureItem {
  number?: string;
  icon?: IconName;
  title: string;
  text: string;
  points?: string[];
  photo?: string;
}

export interface FeaturesSection extends SectionBase {
  type: "features";
  variant?: "table" | "cards";
  columns?: 2 | 3;
  items: FeatureItem[];
}

// Steps

export interface StepItem {
  number: string;
  title: string;
  text: string;
  meta?: string;
}

export interface StepsSection extends SectionBase {
  type: "steps";
  /**
   * rail — 4 колонки на общей линейке, stack — 2 колонки,
   * numbered-nodes — вертикальный таймлайн: номера шагов сидят
   * бейджами на оси, карточки шагов расходятся по сторонам.
   */
  variant?: "rail" | "stack" | "numbered-nodes";
  items: StepItem[];
}

// Gallery (кейсы/работы)

export interface CaseItem {
  category: string;
  problem: string;
  result: string;
  year: string;
  /**
   * Колонка-статус: рендерится плашкой Badge variant="soft".
   * Колонка появляется в реестре, только если статус задан хотя бы
   * у одного элемента — иначе раскладка остаётся прежней.
   */
  status?: string;
  /** Колонка-теги: мелкие моноширинные плашки Badge variant="outline". */
  tags?: string[];
}

export interface GallerySection extends SectionBase {
  type: "gallery";
  variant?: "register" | "grid";
  items: CaseItem[];
  note?: string;
}

// Testimonials

export interface TestimonialItem {
  quote: string;
  author: string;
  meta?: string;
}

export interface TestimonialsSection extends SectionBase {
  type: "testimonials";
  variant?: "quotes" | "cards";
  items: TestimonialItem[];
}

// Team

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  experience: string;
  photo?: string;
}

export interface TeamSection extends SectionBase {
  type: "team";
  /**
   * columns — 3 колонки на линейках, rows — одна колонка,
   * cards — те же 3 колонки, но каждый человек в карточке
   * (единственный вариант, где у секции появляется глубина пресета).
   */
  variant?: "columns" | "rows" | "cards";
  items: TeamMember[];
}

// About ("о нас" / "о месте")

export interface AboutSection extends SectionBase {
  type: "about";
  /** Какая колонка занята фото — вторая колонка всегда 7/12, текстовая 5/12. */
  variant?: "photo-right" | "photo-left";
  /** Абзацы, один <p> на элемент массива. */
  text: string[];
  photo: string;
  photoAlt?: string;
}

// FAQ

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection extends SectionBase {
  type: "faq";
  variant?: "narrow" | "split";
  items: FaqItem[];
}

// Pricing

export interface PricingPlan {
  name: string;
  price: string;
  unit?: string;
  text?: string;
  features: string[];
  action?: CtaLink;
  featured?: boolean;
  photo?: string;
}

export interface PricingSection extends SectionBase {
  type: "pricing";
  variant?: "table" | "cards";
  items: PricingPlan[];
  note?: string;
}

// CTA

export interface CtaSection extends SectionBase {
  type: "cta";
  variant?: "band" | "quiet";
  actions?: CtaLink[];
  note?: string;
}

// Contact

export interface SelectOption {
  label: string;
  value: string;
}

export interface ContactFieldConfig {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  /** Варианты селекта, когда подпись и отправляемое значение совпадают. */
  options?: string[];
  /**
   * Варианты селекта с разделением подписи и значения: в заявку уходит
   * value, пользователь видит label. Приоритетнее options, если заданы оба.
   */
  selectOptions?: SelectOption[];
}

export interface ContactSection extends SectionBase {
  type: "contact";
  variant?: "split" | "stacked";
  /**
   * plain — форма лежит прямо на поверхности секции (база),
   * cardContainer — форма упакована в Card variant="elevated".
   * Не путать с variant: variant задаёт раскладку колонок, layout —
   * подложку под самой формой.
   */
  layout?: "plain" | "cardContainer";
  fields: ContactFieldConfig[];
  submitLabel: string;
  consent: string;
  successTitle: string;
  successText: string;
  errorText: string;
  /** Заголовок левой колонки с реквизитами. */
  detailsTitle?: string;
  /** URL embed-iframe карты (Google/Yandex Maps). Без него карта не рендерится. */
  mapSrc?: string;
}

export type Section =
  | HeroSection
  | StatsSection
  | FeaturesSection
  | StepsSection
  | GallerySection
  | TestimonialsSection
  | TeamSection
  | AboutSection
  | FaqSection
  | PricingSection
  | CtaSection
  | ContactSection;

export type SectionType = Section["type"];

// Конфиг сайта целиком

export interface BrandConfig {
  name: string;
  /** Короткий знак в хедере/футере, единственное акцентное место в брендинге.
   * Либо текст ("К&П"), либо локальный путь к файлу лого (`/images/...`) —
   * определяется по ведущему слэшу в `components/ui/BrandMark.tsx`. */
  mark: string;
  legalName: string;
  tagline: string;
  description: string;
}

export interface ContactsConfig {
  phone: string;
  phoneHref: string;
  email: string;
  telegram: string;
  telegramHref: string;
  whatsapp?: string;
  whatsappHref?: string;
  instagram?: string;
  instagramHref?: string;
  address: string;
  addressShort: string;
  postalCode: string;
  city: string;
  country: string;
  geo: { lat: number; lng: number };
  hours: string;
  hoursSchema: string;
  inn?: string;
  ogrn?: string;
}

export interface SeoConfig {
  siteUrl: string;
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  locale: string;
  ogImageAlt: string;
  /** Текст на OG-картинке (генерится через next/og). */
  ogHeadline: string;
  priceRange: string;
}

export interface ThemeConfig {
  darkModeToggle: boolean;
  defaultMode: "light" | "dark";
  /** Символ для favicon, если нет файла-картинки. */
  faviconGlyph: string;
  /**
   * Тариф оформления. Не задан — "econom" (плоская база).
   * Одно это поле включает всю глубину «Стандарта»: тени, радиусы,
   * поверхности карточек, подсветку секций, плашки под иконками — и
   * заодно переключает дефолтные раскладки секций на карточные.
   * Подробно — docs/presets.md.
   */
  preset?: Preset;
}

export interface FooterConfig {
  note: string;
  legal: string[];
  links: CtaLink[];
}

export interface SiteConfig {
  brand: BrandConfig;
  contacts: ContactsConfig;
  seo: SeoConfig;
  theme: ThemeConfig;
  analytics: { yandexMetrikaId: string | null };
  header: { actions: CtaLink[] };
  footer: FooterConfig;
  sections: Section[];
}
