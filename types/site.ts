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
  /**
   * Хвост после value. В карточных вариантах (badge/playful/plain/dark/
   * bento/photo) это цветной остаток числа («+», «%»); в rows — целая
   * фраза после числа («+ Cases», « Years», « Win Rate»), поэтому там
   * suffix пишут с пробелом впереди.
   */
  suffix?: string;
  label: string;
  /** Иконка над/рядом с числом. Читают badge, playful, plain, dark, bento, photo, rows. */
  icon?: IconName;
  /** Более длинное описание под числом. Читают bento, rows; для остальных не нужно. */
  text?: string;
}

export interface StatsSection extends SectionBase {
  type: "stats";
  /**
   * band/grid — исходные плоские раскладки, без заголовка секции.
   * badge     — пилюля-эйробров + крупный заголовок в две строки + лид,
   *             карточки с круглой плашкой под иконкой.
   * rows      — заголовок слева, плоские колонки на линейках: иконка и
   *             подпись сверху, крупная фраза (value+suffix), описание
   *             (text) снизу.
   * bento     — заголовок по центру, асимметричная сетка 2×2: первая
   *             карточка с акцентной рамкой, последняя — на ink-поверхности.
   * photo     — фото с заголовком/лидом поверх слева, сетка 2×2 карточек
   *             справа (image обязателен, иначе фото нечем закрыть).
   * playful   — заголовок по центру, круглая плашка под иконкой (тот же
   *             акцент, что и у badge — раскраска по item в шаблоне не
   *             используется, см. parts/StatCard.tsx).
   * plain     — заголовок по центру, голая иконка без плашки, компактные
   *             карточки.
   * dark      — тот же состав, что и plain, но на surface="ink".
   */
  variant?: "band" | "grid" | "badge" | "rows" | "bento" | "photo" | "playful" | "plain" | "dark";
  /**
   * Подложка под цифрами: flat — полоса во всю ширину с линейками
   * сверху/снизу (база), elevated — единый блок с тенью,
   * bordered — блок с акцентной рамкой. Линейки секции при elevated
   * и bordered снимаются, иначе блок «перечёркнут» ими. Читают только
   * band/grid — карточные варианты сами решают подложку каждой карточки.
   */
  containerVariant?: "flat" | "elevated" | "bordered";
  /** Фото для variant="photo". Без него эта раскладка не рендерится. */
  image?: string;
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
  /** Ссылка «Подробнее» на элементе. Читают cards-cta, grid-links, bento. */
  link?: CtaLink;
  /** Короткие теги-плашки под описанием. Читает только bento. */
  tags?: string[];
}

export interface FeaturesSection extends SectionBase {
  type: "features";
  /**
   * table/cards      — исходные раскладки.
   * cards-cta        — заголовок пилюлей по центру, карточки со ссылкой
   *                    `item.link`, опциональная кнопка `action` под сеткой.
   * grid-links       — заголовок в две колонки (title слева, lead справа),
   *                    сетка 2 колонки на линейках (без карточек — рамки
   *                    рисует grid, как в table) со стрелкой-ссылкой.
   * bento            — заголовок пилюлей по центру, асимметричная
   *                    двухколоночная сетка карточек; `item.tags` — плашки
   *                    под описанием первого элемента.
   */
  variant?: "table" | "cards" | "cards-cta" | "grid-links" | "bento";
  columns?: 2 | 3;
  /** Кнопка под сеткой карточек. Читает только cards-cta. */
  action?: CtaLink;
  items: FeatureItem[];
}

// Steps

export interface StepItem {
  number: string;
  title: string;
  text: string;
  meta?: string;
  /** Иконка шага. Читают cards, cascade, timeline, split, numbered-cards, а также rail/stack — если задана. */
  icon?: IconName;
  /** Фото шага, локальный путь `/images/...` (см. раздел 2 section-system.md). Читают cascade, split, numbered-cards. */
  photo?: string;
  /** Визуально выделенный шаг (акцентная заливка). Читают split, numbered-cards — обычно последний шаг («Результат»). */
  featured?: boolean;
}

export interface StepsSection extends SectionBase {
  type: "steps";
  /**
   * rail            — 4 колонки на общей линейке, stack — 2 колонки.
   * numbered-nodes  — вертикальный таймлайн: номера-бейджи на оси,
   *                   карточки шагов расходятся по сторонам.
   * cards           — простой ряд карточек: круглая плашка под иконкой,
   *                   «N. Заголовок» одной строкой, описание.
   * cascade         — карточки каскадом (каждая следующая ниже и правее
   *                   предыдущей), номер — бейдж на углу карточки. С
   *                   `surface="ink"` и `photo` у items — тёмный вариант
   *                   с фото в подвале карточки; без них — светлый и без фото.
   * timeline        — горизонтальная линия с круглыми нодами-иконками,
   *                   заголовок и описание под каждой нодой, первая нода
   *                   выделена акцентным кольцом.
   * split           — фото с заголовком/лидом поверх слева (как
   *                   Stats variant="photo"), сетка 2×2 карточек справа;
   *                   `featured` красит карточку акцентной заливкой.
   * numbered-cards  — ряд карточек: кружок-номер + соединительная линия,
   *                   иконка, заголовок, описание, фото в подвале;
   *                   `featured` — карточка на тёмной поверхности.
   */
  variant?:
    | "rail"
    | "stack"
    | "numbered-nodes"
    | "cards"
    | "cascade"
    | "timeline"
    | "split"
    | "numbered-cards";
  /** Фото для variant="split" — эйброу/заголовок/лид ложатся поверх него. Без него вариант не рендерится. */
  image?: string;
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
  /** Заголовок кейса. Читают cards-icon, photo-grid, photo-bento. */
  title?: string;
  /** Фото кейса, локальный путь `/images/...`. Читают photo-grid, photo-bento. */
  photo?: string;
  /** Ссылка «Подробнее». Читают cards-icon, photo-grid, photo-bento. */
  link?: CtaLink;
  /** Иконка в плашке карточки. Читает только cards-icon. */
  icon?: IconName;
  /** Дата публикации кейса («Май 2024»). Читает только photo-grid. */
  date?: string;
  /** Пара «значение — подпись» под описанием (сумма, срок). Читает только photo-bento. */
  stats?: { value: string; label: string }[];
}

export interface GallerySection extends SectionBase {
  type: "gallery";
  /**
   * register/grid — исходные раскладки, построчный реестр и карточки.
   * cards-icon    — заголовок пилюлей, карточки с иконкой в плашке,
   *                 категорией-ссылкой и ссылкой `link`.
   * photo-grid    — заголовок пилюлей, ряд карточек с фото (категория —
   *                 плашка поверх фото), ссылка `link` + `date` внизу.
   * photo-bento   — заголовок пилюлей, асимметричная сетка: первый
   *                 элемент — крупный, с фото и `stats`, остальные —
   *                 обычная сетка (фото — если задано, иначе плашка).
   */
  variant?: "register" | "grid" | "cards-icon" | "photo-grid" | "photo-bento";
  items: CaseItem[];
  note?: string;
  /** Кнопка в шапке секции. Читает только cards-icon. */
  action?: CtaLink;
}

// Testimonials

export interface TestimonialItem {
  quote: string;
  author: string;
  meta?: string;
  /** Аватар автора. Читают bento, rated-cards, spotlight. */
  photo?: string;
  /** Оценка 0–5 (звёзды). Читают bento, rated-cards, spotlight. */
  rating?: number;
  /** Короткая строка результата с иконкой («Сделка закрыта на 1,4 млрд»). Читает только spotlight. */
  result?: string;
  /** Выделенная (тёмная) карточка. Читают bento, rated-cards — обычно последний отзыв. */
  featured?: boolean;
}

export interface TestimonialsSection extends SectionBase {
  type: "testimonials";
  /**
   * quotes/cards   — исходные раскладки.
   * bento          — заголовок пилюлей по центру, первый отзыв —
   *                  крупный (рейтинг + большая цитата + автор с фото),
   *                  остальные — сетка поменьше.
   * rated-cards    — заголовок пилюлей, простой ряд карточек: рейтинг,
   *                  цитата, линейка, автор с фото. `item.featured` —
   *                  карточка на ink-поверхности.
   * spotlight      — заголовок слева, один крупный отзыв (рейтинг,
   *                  цитата, `result`, автор) слева, список остальных
   *                  отзывов справа (без карточек, на линейках).
   */
  variant?: "quotes" | "cards" | "bento" | "rated-cards" | "spotlight";
  items: TestimonialItem[];
  /** Строка «нам доверяют» под отзывами. Тот же тип, что у Hero. */
  trust?: HeroTrust;
}

// Team

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  experience: string;
  photo?: string;
  /** Иконки-ссылки (почта, соцсеть). Читают photo-cards, badge-avatars, bento. */
  social?: { icon: IconName; href: string; label: string }[];
  /** Короткие теги-навыки под описанием. Читает только tags-cards. */
  tags?: string[];
  /** Ссылка «Подробнее»/«View Bio». Читают tags-cards, bento. */
  link?: CtaLink;
}

/**
 * Баннер «Хотите к нам?» под сеткой людей. Читают только photo-cards,
 * badge-avatars, tags-cards — каждый вариант оформляет его по-своему
 * (мягкая карточка, акцентная заливка, цитата с рамкой), но данные одни
 * и те же.
 */
export interface TeamBanner {
  title: string;
  text: string;
  action: CtaLink;
}

export interface TeamSection extends SectionBase {
  type: "team";
  /**
   * columns        — 3 колонки на линейках.
   * rows           — одна колонка.
   * cards          — те же 3 колонки, каждый человек в карточке.
   * photo-cards    — заголовок пилюлей по центру, фото во всю ширину
   *                  карточки (без отступов сверху), роль/имя/описание
   *                  снизу, `social` — иконки-ссылки.
   * badge-avatars  — круглый аватар со значком-иконкой в углу, роль —
   *                  плашкой (Badge soft), описание, `social`.
   * tags-cards     — квадратное фото, ссылка `link` иконкой в углу
   *                  заголовка, роль капсом, описание, `tags`.
   * bento          — заголовок слева + фото справа (как About), дальше
   *                  сетка людей: первый — крупный с фото на всю ширину
   *                  ячейки и `social`/`link`, остальные — сетка поменьше.
   */
  variant?:
    | "columns"
    | "rows"
    | "cards"
    | "photo-cards"
    | "badge-avatars"
    | "tags-cards"
    | "bento";
  items: TeamMember[];
  /** Фото для шапки variant="bento". Без него шапка остаётся текстовой. */
  image?: string;
  banner?: TeamBanner;
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
  /** Иконка в плашке слева от вопроса. Читают split-sidebar, categorized. */
  icon?: IconName;
  /** Теги под ответом. Читает только split-sidebar. */
  tags?: string[];
  /** Категория для фильтра-пилюль. Читает только categorized; без него у всех items пилюли не рендерятся. */
  category?: string;
}

/** Карточка «остались вопросы?» в боковой колонке split-sidebar. */
export interface FaqSupport {
  icon?: IconName;
  title: string;
  text: string;
  action: CtaLink;
}

export interface FaqSection extends SectionBase {
  type: "faq";
  /**
   * narrow/split    — исходные, одна колонка на 760/1240px.
   * split-sidebar   — заголовок и опциональная карточка `support` слева,
   *                   аккордеон справа.
   * categorized     — заголовок пилюлей по центру, фильтр-пилюли по
   *                   `item.category` (настоящая фильтрация, клиентский
   *                   стейт), аккордеон карточками с иконкой у вопроса.
   */
  variant?: "narrow" | "split" | "split-sidebar" | "categorized";
  items: FaqItem[];
  /** Карточка поддержки в сайдбаре. Читает только split-sidebar. */
  support?: FaqSupport;
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
  /**
   * band/quiet — исходные: заголовок слева, кнопки справа в одну строку
   *              (items-end), отличаются только вертикальным ритмом секции.
   * centered   — эйброу пилюлей, заголовок и кнопки по центру в одну колонку.
   * left       — то же по левому краю, эйброу точкой перед подписью вместо пилюли.
   * boxed      — контент в приподнятой карточке (Card variant="elevated")
   *              поверх акцентной заливки, а не прямо на ней.
   * panel      — текст слева, справа — карточка со списком actions
   *              строками на всю ширину, а не рядом кнопок.
   */
  variant?: "band" | "quiet" | "centered" | "left" | "boxed" | "panel";
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
  /**
   * split/stacked — исходные: реквизиты + форма в колонках либо друг под
   *                 другом.
   * boxed         — то же деление 5/7, что у split, но реквизиты — сетка
   *                 карточек (parts/ContactDetailCards), а не список на
   *                 линейках.
   * panels        — полноширинная афиша без Container: форма слева
   *                 (выровнена по общей оси страницы), тёмная панель с
   *                 адресом/телефоном/почтой и картой справа, внахлёст
   *                 к краю окна.
   */
  variant?: "split" | "stacked" | "boxed" | "panels";
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

/**
 * Дизайн хедера. Header не проходит через SectionRenderer (его нет в
 * site.config.sections), поэтому свой вариант выбирает не lib/preset.ts,
 * а прямое поле здесь, в конфиге сайта.
 *
 * default   — знак слева, навигация по центру, кнопка справа (базовый).
 * bold      — жирный вордмарк, навигация и кнопка сгруппированы справа.
 * classic   — вордмарк слева, навигация по центру, текстовая ссылка +
 *             акцентная кнопка справа (двухуровневые actions).
 * compact   — навигация по центру, кнопка-таблетка справа.
 * gradient  — знак-плашка с инициалом слева, кнопка с крупным радиусом.
 * centered  — знак и навигация в две строки, всё по центру, без кнопки.
 * glass     — стеклянная подложка включена всегда, а не только при скролле.
 * split     — навигация разбита на два кластера по бокам от вордмарка.
 */
export type HeaderVariant =
  | "default"
  | "bold"
  | "classic"
  | "compact"
  | "gradient"
  | "centered"
  | "glass"
  | "split";

export interface HeaderConfig {
  actions: CtaLink[];
  variant?: HeaderVariant;
}

/** Колонка сгруппированных ссылок в футере (Bold/Classic/Gradient/Glass). */
export interface FooterColumn {
  title: string;
  links: CtaLink[];
}

/**
 * Иконка-«соцсеть» в футере. Это не логотипы конкретных сетей (Facebook,
 * X и т.п.), а нейтральные иконки из общего реестра — как и в HeroTrust,
 * чужой брендинг в шаблон не тащим. `label` — доступное имя ссылки для
 * скринридера, текстом на странице не выводится.
 */
export interface FooterSocialLink {
  icon: IconName;
  href: string;
  label: string;
}

/**
 * Форма подписки в футере (Gradient/Glass). Настоящая форма method="get",
 * как HeroSearch — уходит на `action` без JS, никакая форма в шаблоне не
 * должна молча съедать введённое.
 */
export interface FooterNewsletter {
  title: string;
  text: string;
  placeholder: string;
  submitLabel: string;
  action: string;
}

/**
 * Дизайн футера. Как и Header, футер не проходит через SectionRenderer —
 * вариант выбирает не lib/preset.ts, а прямое поле здесь.
 *
 * default   — знак и тег слева, плоский список разделов, реквизиты справа.
 * bold      — знак+соцссылки слева, сгруппированные колонки ссылок справа.
 * classic   — то же, три колонки вместо плоского списка.
 * compact   — одна строка: знак+копирайт слева, ссылки справа.
 * gradient  — колонки + форма подписки, знак на акцентном градиенте.
 * centered  — всё по центру: знак, один ряд ссылок, копирайт, соцссылки.
 * glass     — колонки + подписка на стеклянной подложке (как Header glass).
 * split     — ссылки двумя кластерами по бокам от центрального вордмарка.
 */
export type FooterVariant =
  | "default"
  | "bold"
  | "classic"
  | "compact"
  | "gradient"
  | "centered"
  | "glass"
  | "split";

export interface FooterConfig {
  note: string;
  legal: string[];
  links: CtaLink[];
  variant?: FooterVariant;
  /** Сгруппированные колонки ссылок. Без них колончатые варианты (bold,
   *  classic, gradient, glass) просто не рендерят блок колонок. */
  columns?: FooterColumn[];
  social?: FooterSocialLink[];
  newsletter?: FooterNewsletter;
}

export interface SiteConfig {
  brand: BrandConfig;
  contacts: ContactsConfig;
  seo: SeoConfig;
  theme: ThemeConfig;
  analytics: { yandexMetrikaId: string | null };
  header: HeaderConfig;
  footer: FooterConfig;
  sections: Section[];
}
