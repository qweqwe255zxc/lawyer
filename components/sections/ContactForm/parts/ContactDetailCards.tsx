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
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { yandexMapsHref } from "./yandexMapsHref";
import type { ContactsConfig } from "@/types/site";

interface ContactDetailCardsProps {
  contacts: ContactsConfig;
  detailsTitle?: string;
  /** URL embed-iframe карты. Без него карта не рендерится. */
  mapSrc?: string;
  /** Показывать карту. По умолчанию true. */
  showMap?: boolean;
  className?: string;
}

/**
 * То же, что parts/ContactDetails.tsx, но каждая строка реквизитов —
 * своя карточка (Card variant="framed") в сетке 2 колонки, а не строка
 * списка на линейках. Читает только variant="boxed": там глубина секции
 * должна быть видна и в блоке реквизитов, не только в форме.
 */
export function ContactDetailCards({
  contacts,
  detailsTitle,
  mapSrc,
  showMap = true,
  className,
}: ContactDetailCardsProps) {
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
    {
      icon: MapPin,
      label: "Офис",
      value: contacts.address,
      href: yandexMapsHref(contacts),
    },
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

      {/* Одна колонка на любой ширине: раньше был sm:grid-cols-2, но эта
          колонка сама сужается до 5/12 контейнера уже с lg (см. Boxed.tsx/
          Split.tsx) — 2 карточки в ряд в такой узкой колонке стояли
          тесно, текст в них подпирал края. Блок получается выше, зато
          карточки не сжаты. */}
      <div className={cn("grid gap-4", detailsTitle && "mt-7")}>
        {details.map(({ icon: Icon, label, value, href }) => (
          <Card key={label} variant="framed" className="flex items-start gap-3">
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              className="mt-0.5 size-5 shrink-0 text-fg-muted"
            />
            <div className="min-w-0">
              <p className="text-caption font-medium uppercase text-fg-muted">
                {label}
              </p>
              <p className="tabular mt-1.5 text-body">
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
              </p>
            </div>
          </Card>
        ))}
      </div>

      {contacts.inn || contacts.ogrn ? (
        <p className="tabular mt-4 text-small text-fg-muted">
          {[
            contacts.inn && `ИНН ${contacts.inn}`,
            contacts.ogrn && `ОГРН ${contacts.ogrn}`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      ) : null}

      {showMap && mapSrc ? (
        <div className="ui-media-raised mt-4 overflow-hidden border border-rule">
          <iframe
            src={mapSrc}
            loading="lazy"
            title="Карта проезда"
            className="block w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
            style={{ border: 0, aspectRatio: "16 / 9" }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ContactDetailCards;
