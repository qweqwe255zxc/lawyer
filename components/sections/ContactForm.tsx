"use client";

import { useRef, useState, type FormEvent } from "react";
import { AtSign, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { isRuPhoneComplete } from "@/lib/phoneMask";
import { cn } from "@/lib/cn";
import type { ContactSection, ContactsConfig } from "@/types/site";

type ContactFormProps = ContactSection & { contacts: ContactsConfig };

/** Если форму заполнили быстрее — почти наверняка бот. */
const MIN_FILL_MS = 3000;

const REQUIRED_MESSAGE = "Обязательное поле";
const PHONE_INCOMPLETE_MESSAGE = "Введите номер полностью";

export function ContactForm(props: ContactFormProps) {
  const {
    id,
    surface = "surface",
    variant = "split",
    layout = "plain",
    number,
    eyebrow,
    title,
    lead,
    detailsTitle,
    fields,
    submitLabel,
    consent,
    successTitle,
    successText,
    errorText,
    contacts,
    mapSrc,
  } = props;

  const isStacked = variant === "stacked";
  const inCard = layout === "cardContainer";
  /** Колонка формы: в cardContainer её держит обёртка вокруг Card. */
  const formColumn = isStacked ? undefined : "md:col-span-7";

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
          // и перепроверяем на сервере
          company: honeypotRef.current?.value ?? "",
          elapsed: Date.now() - mountedAt.current,
          minFill: MIN_FILL_MS,
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

  const details: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "Телефон", value: contacts.phone, href: contacts.phoneHref },
    { icon: Mail, label: "Почта", value: contacts.email, href: `mailto:${contacts.email}` },
    { icon: Send, label: "Telegram", value: contacts.telegram, href: contacts.telegramHref },
    ...(contacts.whatsapp
      ? [{ icon: MessageCircle, label: "WhatsApp", value: contacts.whatsapp, href: contacts.whatsappHref }]
      : []),
    ...(contacts.instagram
      ? [{ icon: AtSign, label: "Instagram", value: contacts.instagram, href: contacts.instagramHref }]
      : []),
    { icon: MapPin, label: "Офис", value: contacts.address, href: undefined },
    { icon: Clock, label: "Часы работы", value: contacts.hours, href: undefined },
  ];

  const formNode = (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={inCard ? undefined : formColumn}
      data-reveal
    >
      {/* honeypot: обычный человек это поле не видит и не заполнит */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="field-company">Компания</label>
        <input
          ref={honeypotRef}
          id="field-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-gutter gap-y-8 sm:grid-cols-2">
        {fields.map((field) => (
          <Input
            key={field.name}
            field={field}
            value={values[field.name] ?? ""}
            onChange={(value) => setField(field.name, value)}
            error={errors[field.name]}
            className={field.type === "textarea" ? "sm:col-span-2" : undefined}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Отправляем…" : submitLabel}
        </Button>
      </div>

      <p className="measure mt-6 text-small text-fg-muted">{consent}</p>
    </form>
  );

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div
          className={cn(
            "mt-14 grid gap-x-gutter gap-y-14 md:mt-20",
            isStacked ? "md:grid-cols-1" : "md:grid-cols-12",
          )}
        >
          {/* Реквизиты сторон */}
          <div className={isStacked ? undefined : "md:col-span-5"} data-reveal>
            {detailsTitle ? (
              <h3 className="text-caption font-medium uppercase text-fg-muted">
                {detailsTitle}
              </h3>
            ) : null}

            <dl className="mt-7 border-t border-rule">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 border-b border-rule py-5"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-0.5 size-5 shrink-0 text-fg-muted"
                  />
                  <div className="min-w-0">
                    <dt className="text-caption font-medium uppercase text-fg-muted">
                      {label}
                    </dt>
                    <dd className="tabular mt-1.5 text-body">
                      {href ? (
                        <a
                          href={href}
                          className="underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          {...(href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            {contacts.inn || contacts.ogrn ? (
              <p className="tabular mt-6 text-small text-fg-muted">
                {[contacts.inn && `ИНН ${contacts.inn}`, contacts.ogrn && `ОГРН ${contacts.ogrn}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}

            {mapSrc ? (
              <div
                className={cn(
                  "mt-6 overflow-hidden rounded-doc-sm border border-rule",
                  // В stacked-варианте колонка реквизитов растягивается на всю
                  // ширину контейнера (~1240px) вместо узкой 5/12-колонки —
                  // без верхнего предела ширины iframe с aspectRatio="4/3"
                  // растягивается вместе с ней и превращается в 930px высотой
                  // полосу на весь экран. В split-варианте колонка и так узкая
                  // (5/12), там это ограничение не нужно и не применяется.
                  isStacked && "mx-auto max-w-md",
                )}
              >
                <iframe
                  src={mapSrc}
                  loading="lazy"
                  title="Карта проезда"
                  className="block w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
                  style={{ border: 0, aspectRatio: "4 / 3" }}
                />
              </div>
            ) : null}
          </div>

          {/* Форма. В cardContainer колонку держит обёртка, а сама форма
              лежит внутри поднятой карточки. */}
          {inCard ? (
            <div className={formColumn}>
              <Card variant="elevated">{formNode}</Card>
            </div>
          ) : (
            formNode
          )}
        </div>
      </Container>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </Section>
  );
}

export default ContactForm;
