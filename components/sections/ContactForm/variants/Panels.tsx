"use client";

import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Toast } from "@/components/ui/Toast";
import { FormColumn } from "../parts/FormColumn";
import { useContactForm } from "../parts/useContactForm";
import type { ContactFormProps } from "../types";

/**
 * Полноширинная афиша: форма слева выровнена по общей оси страницы —
 * тот же приём, что у Hero/Billboard (mr-auto-блок фиксированной ширины
 * calc(var(--container-page)/2), чтобы левый край текста совпадал с
 * краем Container независимо от ширины окна), справа — тёмная панель
 * со своим data-surface="ink" (адрес, телефон, почта) и картой внахлёст
 * к правому краю окна. Своего Container нет — панели сами держат
 * отступы, поэтому Section идёт со spacing="none".
 *
 * number секция тут не показывает — колонтитулу негде стоять на
 * полноширинной панели без общего левого поля (тот же случай, что и у
 * Hero/Billboard).
 */
export function Panels(props: ContactFormProps) {
  const {
    id,
    surface = "surface",
    layout = "plain",
    eyebrow,
    title,
    lead,
    fields,
    submitLabel,
    consent,
    successTitle,
    successText,
    errorText,
    contacts,
    mapSrc,
  } = props;

  const form = useContactForm({
    fields,
    successTitle,
    successText,
    errorText,
  });

  return (
    <Section id={id} surface={surface} spacing="none">
      <div className="grid md:grid-cols-2 md:items-stretch">
        <div className="mr-auto w-full max-w-[calc(var(--container-page)/2)] px-gutter py-section-lg">
          {eyebrow ? (
            <p className="text-caption font-medium uppercase text-fg-muted" data-reveal>
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <h2 className={`font-heading text-h2 ${eyebrow ? "mt-4" : ""}`} data-reveal>
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p className="mt-5 max-w-[46ch] text-lead text-fg-muted" data-reveal>
              {lead}
            </p>
          ) : null}

          <FormColumn
            form={form}
            fields={fields}
            submitLabel={submitLabel}
            consent={consent}
            layout={layout}
            columnClassName="mt-10"
          />
        </div>

        {/* Панель — собственный контекст поверхности, тот же приём, что
            у Hero/Billboard: data-surface переопределяет цветовые
            переменные для всего поддерева. */}
        <div data-surface="ink" className="bg-bg text-fg">
          <div className="px-gutter py-section-lg md:px-12">
            <p className="text-caption font-medium uppercase text-fg-muted" data-reveal>
              Офис
            </p>
            <h3 className="mt-4 font-heading text-h2" data-reveal>
              {contacts.addressShort}
            </h3>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
              <div className="flex items-start gap-3" data-reveal>
                <span className="icon-tile">
                  <Phone aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </span>
                <div>
                  <p className="text-caption font-medium uppercase text-fg-muted">
                    Телефон
                  </p>
                  <a
                    href={contacts.phoneHref}
                    className="tabular mt-1 block text-body underline decoration-rule-strong underline-offset-4"
                  >
                    {contacts.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3" data-reveal>
                <span className="icon-tile">
                  <Mail aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </span>
                <div>
                  <p className="text-caption font-medium uppercase text-fg-muted">
                    Почта
                  </p>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="mt-1 block text-body underline decoration-rule-strong underline-offset-4"
                  >
                    {contacts.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {mapSrc ? (
            <div className="border-t border-rule">
              <iframe
                src={mapSrc}
                loading="lazy"
                title="Карта проезда"
                className="block w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
                style={{ border: 0, aspectRatio: "16 / 10" }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <Toast toast={form.toast} onClose={form.closeToast} />
    </Section>
  );
}

export default Panels;
