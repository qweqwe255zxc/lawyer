"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Считает, помещается ли навигация в отведённую ширину. lg-брейкпоинт
 * страхует только «мало места на экране» — здесь же и «слишком много
 * пунктов при достаточной ширине экрана»: если список не влезает, нав
 * прячется (visibility, не display — см. ниже) и вместо него открывается
 * бургер, а не горизонтальный скролл.
 *
 * Измеряемый элемент нельзя скрывать через display:none: тогда
 * scrollWidth/clientWidth обнуляются, ResizeObserver видит «влезло» и
 * тут же возвращает нав обратно — бесконечное мигание. Поэтому варианты
 * хедера прячут переполненный нав через `invisible` (visibility:hidden),
 * а не `hidden`/`lg:hidden` — он остаётся в layout и остаётся измеримым.
 */
export function useNavOverflow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => setOverflowing(el.scrollWidth - el.clientWidth > 1);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);

    // ResizeObserver следит только за собственным боксом nav (его ширину
    // задаёт грид-колонка снаружи) — он не срабатывает, когда меняется
    // ТОЛЬКО контент внутри при том же боксе. font-display: swap отдаёт
    // самый первый check() на fallback-шрифт до подгрузки настоящего
    // (next/font подключает его почти сразу, но не мгновенно): если
    // реальная гарнитура шире системной, scrollWidth после подмены
    // растёт без изменения clientWidth, ResizeObserver это не ловит,
    // и nav с overflowing=false остаётся залипшим — бургер не появляется
    // там, где уже реально не помещается. document.fonts.ready — сигнал
    // «шрифты подменились», перепроверяем на нём отдельно.
    document.fonts?.ready?.then(check);

    return () => observer.disconnect();
  }, []);

  return { ref, overflowing };
}

export default useNavOverflow;
