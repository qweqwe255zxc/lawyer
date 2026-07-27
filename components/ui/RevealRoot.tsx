"use client";

import { useEffect } from "react";

/**
 * Один IntersectionObserver на всю страницу, а не обёртка на каждый блок —
 * так секции остаются серверными, достаточно повесить data-reveal на элемент.
 *
 * Порядок появления задаётся через --reveal-delay (см. lib/reveal.ts).
 * Вся видимость — в globals.css, тут только переключение флага.
 */
export function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      root.removeAttribute("data-reveal-enabled");
      nodes.forEach((node) => node.setAttribute("data-revealed", "true"));
      return;
    }

    // ставлю флаг только когда обсёрвер точно запустился,
    // иначе контент так и останется скрытым
    root.setAttribute("data-reveal-enabled", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    nodes.forEach((node) => {
      // то, что видно сразу на первом экране, не анимируем — смысла нет
      if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
        node.setAttribute("data-revealed", "true");
        return;
      }
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

export default RevealRoot;
