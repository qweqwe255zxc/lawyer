import type { Config } from "tailwindcss";

/**
 * Не источник конфигурации — в Tailwind CSS v4 она CSS-first,
 * через @theme inline в app/globals.css и переменные из theme/tokens.css.
 * Этот файл лежит на случай, если внешний инструмент (IDE-плагин,
 * линтер, генератор) всё ещё ищет tailwind.config.* по старой привычке.
 * Реальных токенов здесь нет и не должно быть — только пути для сканера.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
};

export default config;
