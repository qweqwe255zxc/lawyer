import { Boxed } from "./variants/Boxed";
import { Panels } from "./variants/Panels";
import { Split } from "./variants/Split";
import { Stacked } from "./variants/Stacked";
import type { VariantMap } from "../variantMap";
import type { ContactFormProps } from "./types";
import type { ContactSection } from "@/types/site";

/**
 * Роутер секции контактов — единственной, у которой варианты клиентские
 * ("use client"): в них живёт стейт формы, антибот-таймер, honeypot и
 * fetch("/api/contact"). Сам роутер серверный: он только выбирает файл,
 * поэтому в клиентский бандл не тащит ничего лишнего.
 *
 * У секции две независимые оси: variant (колонки — сюда) и layout
 * (подложка под формой — parts/FormColumn.tsx). Любая раскладка
 * сочетается с любой подложкой — panels тоже читает layout и передаёт
 * его в FormColumn, хотя сама раскладка там уже нестандартная.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  ContactFormProps,
  NonNullable<ContactSection["variant"]>
> = {
  split: Split,
  stacked: Stacked,
  boxed: Boxed,
  panels: Panels,
};

export function ContactForm(props: ContactFormProps) {
  const Variant = variants[props.variant ?? "split"] ?? Split;
  return <Variant {...props} />;
}

export default ContactForm;
