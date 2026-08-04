import type { ContactsConfig } from "@/types/site";

/** Ссылка на Яндекс.Карты по координатам офиса — адрес становится кликабельным. */
export function yandexMapsHref(contacts: ContactsConfig): string {
  const { lat, lng } = contacts.geo;
  return `https://yandex.ru/maps/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat}`;
}

export default yandexMapsHref;
