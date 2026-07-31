import { Default } from "./variants/Default";
import type { NotFoundProps } from "./types";

/**
 * Роутер страницы 404.
 *
 * Вариант пока один — роутер тут ради единообразия, как у хедера и
 * футера: второй дизайн 404 (например, крупная цифра во весь экран)
 * добавляется тем же алгоритмом, что и второй дизайн любой секции.
 * Своего поля variant у страницы нет; когда появится второй вариант,
 * ручку нужно будет завести в конфиге и читать её здесь.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
export function NotFound(props: NotFoundProps) {
  return <Default {...props} />;
}

export default NotFound;
