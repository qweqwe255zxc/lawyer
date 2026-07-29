#!/usr/bin/env node
/**
 * npm run new-project <name> [-- --dir ../путь]
 *
 * Копирует базу шаблона в соседнюю папку и вычищает контент:
 * секции, тексты и реквизиты обнуляются до заготовок, а вся архитектура —
 * токены, ui, sections, SectionRenderer, SEO, форма — остаётся как есть.
 *
 * Палитра и типографика НЕ трогаются намеренно: их правят руками под
 * конкретный бренд, а не автозаменой.
 */

import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const SKIP = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  ".env.local",
  ".env",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "tsconfig.tsbuildinfo",
]);

function parseArgs(argv) {
  const args = argv.slice(2);
  const name = args.find((arg) => !arg.startsWith("--"));
  const dirIndex = args.indexOf("--dir");
  const dir = dirIndex !== -1 ? args[dirIndex + 1] : null;
  return { name, dir };
}

function fail(message) {
  console.error(`\n  ✕ ${message}\n`);
  process.exit(1);
}

const { name, dir } = parseArgs(process.argv);

if (!name) {
  fail(
    "Укажите имя проекта: npm run new-project my-client\n" +
      "    Имя латиницей, в kebab-case — оно уйдёт в package.json.",
  );
}

if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  fail(`Имя «${name}» не подходит для package.json: только a-z, 0-9 и дефис.`);
}

const source = process.cwd();
const target = path.resolve(source, dir ?? path.join("..", name));

if (existsSync(target) && (await readdir(target)).length > 0) {
  fail(`Папка ${target} уже существует и не пуста.`);
}

console.log(`\n  Копирую базу шаблона → ${target}`);

await mkdir(target, { recursive: true });

for (const entry of await readdir(source, { withFileTypes: true })) {
  if (SKIP.has(entry.name)) continue;
  await cp(path.join(source, entry.name), path.join(target, entry.name), {
    recursive: true,
  });
}

/* --- package.json ------------------------------------------------------ */
const pkgPath = path.join(target, "package.json");
const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
pkg.name = name;
pkg.version = "0.1.0";
pkg.description = `Лендинг ${name}`;
await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");

/* --- site.config.ts: чистый каркас ------------------------------------- */
const blankConfig = `import type { SiteConfig } from "@/types/site";

/**
 * Заготовка под новый проект. Заполнить сверху вниз.
 * Секции добавляются в массив sections — компоненты и SectionRenderer
 * уже готовы, отдельно ничего подключать не нужно.
 */
export const siteConfig: SiteConfig = {
  brand: {
    name: "",
    mark: "",
    legalName: "",
    tagline: "",
    description: "",
  },

  contacts: {
    phone: "+7 000 000-00-00",
    phoneHref: "tel:+70000000000",
    email: "",
    telegram: "",
    telegramHref: "",
    address: "",
    addressShort: "",
    postalCode: "",
    city: "",
    country: "RU",
    geo: { lat: 0, lng: 0 },
    hours: "",
    hoursSchema: "Mo-Fr 09:00-18:00",
  },

  seo: {
    siteUrl: "https://example.ru",
    title: "",
    titleTemplate: "%s",
    description: "",
    keywords: [],
    locale: "ru_RU",
    ogImageAlt: "",
    ogHeadline: "",
    priceRange: "₽₽",
  },

  theme: {
    darkModeToggle: false,
    defaultMode: "light",
    faviconGlyph: "•",
    // Тариф оформления: "econom" | "standard" | "premium".
    // Одно это поле включает всю глубину «Стандарта» (тени, карточки,
    // скругления, подсветку) и переключает дефолтные раскладки секций.
    // Как собирать «Стандарт» — docs/presets.md.
    preset: "econom",
  },

  analytics: {
    yandexMetrikaId: null,
  },

  header: {
    actions: [],
  },

  footer: {
    note: "",
    legal: [],
    links: [],
  },

  // Доступные типы: hero, stats, features, steps, gallery, testimonials,
  // team, faq, pricing, cta, contact. Полные формы данных — в types/site.ts.
  sections: [],
};

export default siteConfig;
`;

await writeFile(
  path.join(target, "content", "site.config.ts"),
  blankConfig,
  "utf8",
);

/* --- Иконки: favicon.ico / apple-touch-icon.png запечены под демо-бренд -
 * это растровые файлы, отрендеренные один раз под конкретный проект
 * (глиф, акцентный цвет) и просто лежат в public/ — в отличие от
 * app/icon.svg/route.ts, они не читают theme.faviconGlyph на лету.
 * Скопировать их как есть в новый проект — значит показать чужому
 * бизнесу favicon и иконку на iOS от предыдущего клиента. Безопаснее
 * удалить и явно попросить сгенерировать новые под этот бренд. --------- */
for (const stale of ["favicon.ico", "apple-touch-icon.png"]) {
  const filePath = path.join(target, "public", stale);
  if (existsSync(filePath)) {
    await rm(filePath);
  }
}

/* --- Заготовка политики: текст под нового оператора вычитывает юрист ---- */
const privacyPath = path.join(target, "app", "privacy", "page.tsx");
if (existsSync(privacyPath)) {
  const privacy = await readFile(privacyPath, "utf8");
  await writeFile(
    privacyPath,
    privacy.replace(
      "/**",
      "/* TODO: текст политики вычитать под нового оператора перед публикацией. */\n/**",
    ),
    "utf8",
  );
}

/* --- README ------------------------------------------------------------ */
await writeFile(
  path.join(target, "README.md"),
  `# ${name}\n\nЛендинг на базе шаблона.\n\n1. \`npm install\`\n2. Заполнить \`content/site.config.ts\`\n3. Проверить палитру и шрифты в \`theme/tokens.css\` и \`theme/palette.ts\`\n4. \`cp .env.example .env.local\` и заполнить каналы формы\n5. Добавить \`public/favicon.ico\` и \`public/apple-touch-icon.png\` под этот бренд (в шаблоне их не было — старые от демо-проекта нарочно удалены при копировании). \`app/icon.svg\` дополнительно генерируется на лету из \`theme.faviconGlyph\`, отдельно править не нужно\n6. \`npm run dev\`\n`,
  "utf8",
);

console.log(`
  ✓ Готово.

    cd ${path.relative(path.dirname(source), target)}
    npm install
    npm run dev

  Дальше: content/site.config.ts → theme/tokens.css → .env.local
  Не забыть: public/favicon.ico + public/apple-touch-icon.png под новый бренд
  (старые от демо-проекта удалены, чтобы не утащить чужой логотип)
`);
