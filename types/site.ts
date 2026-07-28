import type { IconName } from "@/lib/icons";

// Типы конфига сайта. Секция = данные + surface + variant.
// Компоненты текст не хранят, всё приходит сюда пропсами из site.config.ts.

/** Фон секции, задаёт цвета через CSS-переменные (paper/surface/ink/accent). */
export type Surface = "paper" | "surface" | "ink" | "accent";

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

export interface HeroSection extends SectionBase {
  type: "hero";
  variant?: "type-only" | "split";
  /** Строки заголовка, переносы расставляем вручную. */
  headline: string[];
  actions?: CtaLink[];
  facts?: HeroFact[];
  /** Вертикальный колонтитул на левом поле. */
  rail?: string;
  /** Фон/фото для variant="split". Без variant="split" не используется. */
  image?: string;
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
  variant?: "rail" | "stack";
  items: StepItem[];
}

// Gallery (кейсы/работы)

export interface CaseItem {
  category: string;
  problem: string;
  result: string;
  year: string;
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
  variant?: "columns" | "rows";
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

export interface ContactFieldConfig {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface ContactSection extends SectionBase {
  type: "contact";
  variant?: "split" | "stacked";
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
  /** Короткий знак в хедере/футере, единственное акцентное место в брендинге. */
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
