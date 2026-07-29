"use client";

import {
  AtSign,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { ContactsConfig } from "@/types/site";

interface ContactDetailsProps {
  contacts: ContactsConfig;
  detailsTitle?: string;
  /** URL embed-iframe карты. Без него карта не рендерится. */
  mapSrc?: string;
  /** Классы колонки реквизитов. */
  className?: string;
  /**
   * Ограничить ширину карты. Нужно только раскладке в одну колонку:
   * там колонка реквизитов растягивается на весь контейнер (~1240px), и
   * iframe с aspectRatio 4/3 превращается в полосу 930px высотой на весь
   * экран. В split колонка и так узкая (5/12).
   */
  mapClassName?: string;
}

/**
 * Реквизиты сторон: телефон, почта, мессенджеры, адрес, часы, ИНН/ОГРН и
 * карта. Строки мессенджеров рендерятся, только если соответствующее поле
 * задано в contacts; без *Href строка выводится текстом, а не ссылкой.
 */
export function ContactDetails({
  contacts,
  detailsTitle,
  mapSrc,
  className,
  mapClassName,
}: ContactDetailsProps) {
  const details: {
    icon: typeof Phone;
    label: string;
    value: string;
    href?: string;
  }[] = [
    {
      icon: Phone,
      label: "Телефон",
      value: contacts.phone,
      href: contacts.phoneHref,
    },
    {
      icon: Mail,
      label: "Почта",
      value: contacts.email,
      href: `mailto:${contacts.email}`,
    },
    {
      icon: Send,
      label: "Telegram",
      value: contacts.telegram,
      href: contacts.telegramHref,
    },
    ...(contacts.whatsapp
      ? [
          {
            icon: MessageCircle,
            label: "WhatsApp",
            value: contacts.whatsapp,
            href: contacts.whatsappHref,
          },
        ]
      : []),
    ...(contacts.instagram
      ? [
          {
            icon: AtSign,
            label: "Instagram",
            value: contacts.instagram,
            href: contacts.instagramHref,
          },
        ]
      : []),
    { icon: MapPin, label: "Офис", value: contacts.address, href: undefined },
    {
      icon: Clock,
      label: "Часы работы",
      value: contacts.hours,
      href: undefined,
    },
  ];

  return (
    <div className={className} data-reveal>
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
          {[
            contacts.inn && `ИНН ${contacts.inn}`,
            contacts.ogrn && `ОГРН ${contacts.ogrn}`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      ) : null}

      {mapSrc ? (
        <div
          className={cn(
            "ui-media-raised mt-6 overflow-hidden border border-rule",
            mapClassName,
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
  );
}

export default ContactDetails;
