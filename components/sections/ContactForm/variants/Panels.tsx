"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Toast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { FormColumn } from "../parts/FormColumn";
import { useContactForm } from "../parts/useContactForm";
import { yandexMapsHref } from "../parts/yandexMapsHref";
import type { ContactFormProps } from "../types";

/**
 * Полноширинная афиша: форма слева выровнена по общей оси страницы —
 * тот же приём, что у Hero/Poster (mr-auto-блок фиксированной ширины
 * calc(var(--container-page)/2), чтобы левый край текста совпадал с
 * краем Container независимо от ширины окна), справа — тёмная панель
 * со своим data-surface="ink" (адрес, телефон, почта) и картой внахлёст
 * к правому краю окна. Своего Container нет — панели сами держат
 * отступы, поэтому Section идёт со spacing="none".
 *
 * number секция тут не показывает — колонтитулу негде стоять на
 * полноширинной панели без общего левого поля (тот же случай, что и у
 * Hero/Poster).
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
    showMap = true,
    iconShape,
  } = props;

  const form = useContactForm({
    fields,
    successTitle,
    successText,
    errorText,
  });

  return (
    <Section id={id} surface={surface} spacing="none" iconShape={iconShape}>
      <div className="grid md:grid-cols-2 md:items-stretch">
        {/* text-center + mx-auto на заголовке/лиде и на самой форме — тот
            же приём max-w(...)/2 держит колонку на общей оси страницы,
            но раньше содержимое внутри было прижато к левому краю этой
            колонки, а не центрировано в ней. */}
        <div className="mx-auto w-full max-w-[calc(var(--container-page)/2)] px-gutter py-section-lg text-center">
          {eyebrow ? (
            <p className="text-caption font-medium uppercase text-fg-muted" data-reveal>
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <h2 className={cn("font-heading text-h2", eyebrow && "mt-4")} data-reveal>
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p className="mx-auto mt-5 max-w-[46ch] text-lead text-fg-muted" data-reveal>
              {lead}
            </p>
          ) : null}

          <FormColumn
            form={form}
            fields={fields}
            submitLabel={submitLabel}
            consent={consent}
            layout={layout}
            columnClassName="mx-auto mt-10 max-w-[32rem] text-left"
          />
        </div>

        {/* Панель — собственный контекст поверхности, тот же приём, что
            у Hero/Poster: data-surface переопределяет цветовые
            переменные для всего поддерева. flex-col + h-full: md:items-stretch
            на строке выше уже тянет обе колонки на одну высоту, а тут это
            превращается в реальное вертикальное пространство — карта
            (flex-1) забирает ВЕСЬ остаток под инфоблоком, а не только
            высоту по aspect-ratio. Раньше при этом снизу оставалась чёрная
            (surface ink) полоса под белой картой фиксированной высоты. */}
        <div data-surface="ink" className="flex h-full flex-col bg-bg text-fg">
          <div className="px-gutter py-section-lg md:px-12">
            <p className="text-caption font-medium uppercase text-fg-muted" data-reveal>
              Офис
            </p>
            <a
              href={yandexMapsHref(contacts)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-w-0 items-start gap-2 break-words font-heading text-h2 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              data-reveal
            >
              <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-2 size-6 shrink-0" />
              {contacts.addressShort}
            </a>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-6">
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

          {showMap && mapSrc ? (
            <div className="relative min-h-[16rem] flex-1 border-t border-rule">
              <iframe
                src={mapSrc}
                loading="lazy"
                title="Карта проезда"
                className="absolute inset-0 block h-full w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
                style={{ border: 0 }}
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
