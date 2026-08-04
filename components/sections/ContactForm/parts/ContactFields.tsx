"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ContactSection } from "@/types/site";
import type { ContactFormState } from "./useContactForm";

interface ContactFieldsProps {
  form: ContactFormState;
  fields: ContactSection["fields"];
  submitLabel: string;
  consent: string;
  /** Колонка формы. В layout="cardContainer" её держит обёртка вокруг Card. */
  className?: string;
}

/**
 * Сам <form>: honeypot, поля, кнопка, согласие. Одинаков во всех
 * раскладках — отличается только тем, где он стоит и лежит ли в карточке.
 */
export function ContactFields({
  form,
  fields,
  submitLabel,
  consent,
  className,
}: ContactFieldsProps) {
  return (
    <form
      ref={form.formRef}
      onSubmit={form.handleSubmit}
      noValidate
      className={className}
      data-reveal
    >
      {/* honeypot: обычный человек это поле не видит и не заполнит.
          Имя/id — "_gotcha", не "company": реальное поле формы с именем
          "company" (естественное для B2B-конфига) раньше делило name/id
          с этим полем и затиралось им при отправке. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="field-_gotcha">Компания</label>
        <input
          ref={form.honeypotRef}
          id="field-_gotcha"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-gutter gap-y-8 sm:grid-cols-2">
        {fields.map((field) => (
          <Input
            key={field.name}
            field={field}
            value={form.values[field.name] ?? ""}
            onChange={(value) => form.setField(field.name, value)}
            error={form.errors[field.name]}
            className={field.type === "textarea" ? "sm:col-span-2" : undefined}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={form.status === "sending"}>
          {form.status === "sending" ? "Отправляем…" : submitLabel}
        </Button>
      </div>

      <p className="measure mt-6 text-small text-fg-muted">{consent}</p>
    </form>
  );
}

export default ContactFields;
