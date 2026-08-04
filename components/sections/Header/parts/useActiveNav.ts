"use client";

import { useEffect, useState } from "react";

/**
 * Какая ссылка навигации сейчас активна — по тому, какая секция стоит
 * в верхней трети экрана, а не по index === 0. Секции резолвятся из
 * href («#services» → id="services"); ссылки без «#» (например /privacy)
 * игнорируются — у них нет секции на этой странице для отслеживания.
 *
 * rootMargin поднимает триггер-линию на высоту хедера (--scroll-offset,
 * 6rem/96px) от верха и обрезает нижние 66% вьюпорта — секция
 * становится активной, как только её верх заходит в эту полосу, и
 * остаётся активной, пока следующая секция не займёт её место.
 */
export function useActiveNav(hrefs: string[]): string | undefined {
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);
  const key = hrefs.join("|");

  useEffect(() => {
    const entries = hrefs
      .filter((href) => href.startsWith("#"))
      .map((href) => ({ href, el: document.getElementById(href.slice(1)) }))
      .filter((entry): entry is { href: string; el: HTMLElement } => entry.el !== null);

    if (entries.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((observedEntry) => {
          if (!observedEntry.isIntersecting) return;
          const match = entries.find((entry) => entry.el === observedEntry.target);
          if (match) setActiveHref(match.href);
        });
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    entries.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeHref;
}

export default useActiveNav;
