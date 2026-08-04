"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ToastState {
  tone: "success" | "error";
  title: string;
  text?: string;
}

interface ToastProps {
  toast: ToastState | null;
  onClose: () => void;
  /** Автозакрытие, мс. 0 — не закрывать. */
  duration?: number;
}

/** Должно совпадать с --duration-toast-exit в theme/tokens.css. */
const EXIT_DURATION = 180;

export function Toast({ toast, onClose, duration = 6000 }: ToastProps) {
  const [content, setContent] = useState(toast);
  const [visible, setVisible] = useState(false);

  // onClose — через ref, не в deps: вызывающая сторона (useContactForm)
  // создаёт closeToast заново на каждый рендер, и тот же тост при любом
  // ре-рендере формы (например, при вводе в поле после ошибки) заново
  // получал бы полный duration — таймер копился бы, а не отсчитывался.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!toast || duration === 0) return;
    const timer = window.setTimeout(() => onCloseRef.current(), duration);
    return () => window.clearTimeout(timer);
  }, [toast, duration]);

  // Тост появляется: контент монтируется сразу, но класс "visible"
  // навешивается кадром позже, чтобы transition успел сработать.
  useEffect(() => {
    if (!toast) return;
    setContent(toast);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [toast]);

  // Тост закрывается: сначала уводим его анимацией, контент из DOM
  // убираем только после того, как transition завершился.
  useEffect(() => {
    if (toast) return;
    setVisible(false);
    const timer = window.setTimeout(() => setContent(null), EXIT_DURATION);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!content) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-surface={content.tone === "success" ? "ink" : "surface"}
      data-state={visible ? "visible" : "hidden"}
      className={cn(
        "toast fixed inset-x-gutter bottom-4 z-[var(--z-toast)] flex items-start gap-4",
        "sm:inset-x-auto sm:right-6 sm:left-auto sm:bottom-6 sm:max-w-md",
        // Радиус и тень — ui-popover (ручки пресета): в «Экономе» те же
        // документные 4px без тени, в «Стандарте» панель отрывается от страницы.
        "ui-popover border border-rule bg-bg p-5 text-fg",
      )}
    >
      {content.tone === "success" ? (
        <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-muted" />
      ) : (
        <X aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-muted" />
      )}

      <div className="min-w-0 flex-1">
        <p className="font-display text-h3">{content.title}</p>
        {content.text ? (
          <p className="mt-1.5 text-small text-fg-muted">{content.text}</p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть уведомление"
        className="-m-1 shrink-0 p-1 text-fg-muted transition-colors hover:text-fg"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

export default Toast;
