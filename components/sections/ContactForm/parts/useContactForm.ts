"use client";

import { useRef, useState, type FormEvent } from "react";
import { isRuPhoneComplete } from "@/lib/phoneMask";
import type { ContactFieldConfig } from "@/types/site";
import type { ToastState } from "@/components/ui/Toast";

const REQUIRED_MESSAGE = "Обязательное поле";
const PHONE_INCOMPLETE_MESSAGE = "Введите номер полностью";
const EMAIL_INVALID_MESSAGE = "Введите корректный email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UseContactFormArgs {
  fields: ContactFieldConfig[];
  successTitle: string;
  successText: string;
  errorText: string;
}

/**
 * Вся механика формы: стейт полей, валидация, антибот-таймер, honeypot,
 * отправка в /api/contact и тост. Вынесена в хук, потому что раскладок у
 * секции несколько (Split/Stacked), а форма у них одна и та же — копия
 * этой логики в каждом варианте разъехалась бы при первой правке.
 *
 * Поля полностью контролируемые: значение и маска телефона живут здесь,
 * чтобы валидация и сброс работали через один источник истины, а не через
 * несинхронизированный DOM-стейт.
 */
export function useContactForm({
  fields,
  successTitle,
  successText,
  errorText,
}: UseContactFormArgs) {
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef<number>(Date.now());

  const emptyValues = () =>
    Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<
      string,
      string
    >;

  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [toast, setToast] = useState<ToastState | null>(null);

  const setField = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  function validate(): Record<string, string> {
    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      const value = values[field.name]?.trim() ?? "";

      if (field.required && !value) {
        nextErrors[field.name] = REQUIRED_MESSAGE;
        continue;
      }

      if (field.type === "tel" && value && !isRuPhoneComplete(value)) {
        nextErrors[field.name] = PHONE_INCOMPLETE_MESSAGE;
      }

      // <form noValidate> глушит и нативную проверку type="email" —
      // без этого "asdf" в обязательном email проходило и на клиенте,
      // и на сервере (там только trim непустой строки).
      if (field.type === "email" && value && !EMAIL_PATTERN.test(value)) {
        nextErrors[field.name] = EMAIL_INVALID_MESSAGE;
      }
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = fields.find((field) => nextErrors[field.name]);
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`#field-${firstInvalid.name}`)
          ?.focus();
      }
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // honeypot шлём как есть, время заполнения считаем на клиенте
          // и перепроверяем на сервере — порог (MIN_FILL_MS) сервер
          // берёт из своей константы, не из этого запроса.
          _gotcha: honeypotRef.current?.value ?? "",
          elapsed: Date.now() - mountedAt.current,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setToast({ tone: "success", title: successTitle, text: successText });
      setValues(emptyValues());
      setErrors({});
      if (honeypotRef.current) honeypotRef.current.value = "";
      mountedAt.current = Date.now();
    } catch {
      setToast({ tone: "error", title: "Ошибка отправки", text: errorText });
    } finally {
      setStatus("idle");
    }
  }

  return {
    formRef,
    honeypotRef,
    values,
    errors,
    status,
    toast,
    setField,
    handleSubmit,
    closeToast: () => setToast(null),
  };
}

export type ContactFormState = ReturnType<typeof useContactForm>;
