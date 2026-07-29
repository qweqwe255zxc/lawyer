import { Default } from "./variants/Default";
import type { FooterProps } from "./types";

/**
 * Роутер футера.
 *
 * Вариант пока один, и роутер выглядит избыточным — он тут ради
 * единообразия: все блоки в components/sections/ устроены одинаково,
 * поэтому второй дизайн футера добавляется тем же алгоритмом, что и
 * второй дизайн любой секции, а не «сначала распилим монолит».
 * Собственного поля variant у футера нет (его нет в site.config.sections),
 * так что выбирать пока не из чего — когда появится второй вариант,
 * ручку нужно будет завести в FooterConfig и читать её здесь.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
export function Footer(props: FooterProps) {
  return <Default {...props} />;
}

export default Footer;
