import { cn } from "@/lib/cn";
import { formatRuPhone } from "@/lib/phoneMask";
import { Select } from "@/components/ui/Select";
import type { ContactFieldConfig } from "@/types/site";

interface InputProps {
  field: ContactFieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

/**
 * Поля с подчёркиванием вместо рамки-коробки, под общую стилистику.
 * Цвет линии — --color-rule-strong (контраст 3.4:1), обычный hairline
 * тут недостаточно контрастен для границы интерактивного поля (WCAG 1.4.11).
 */
const control =
  "w-full bg-transparent border-b border-rule-strong pb-2.5 pt-1 text-body text-fg " +
  "placeholder:text-fg-muted/60 transition-colors hover:border-fg focus:border-fg " +
  "focus:outline-none focus-visible:outline-none rounded-none appearance-none";

/**
 * Полностью контролируемое поле: значение и маска телефона живут
 * в ContactForm, чтобы валидация и сброс формы работали через один
 * источник истины, а не через несинхронизированный DOM-стейт.
 */
export function Input({ field, value, onChange, error, className }: InputProps) {
  const id = `field-${field.name}`;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={cn("group", className)}>
      <label
        htmlFor={id}
        className="mb-2 block text-caption font-medium uppercase text-fg-muted"
      >
        {field.label}
        {field.required ? <span aria-hidden="true"> *</span> : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(control, "resize-y min-h-28")}
        />
      ) : field.type === "select" ? (
        <Select
          id={id}
          name={field.name}
          value={value}
          onChange={onChange}
          options={field.options ?? []}
          placeholder={field.placeholder ?? "Выберите"}
          invalid={Boolean(error)}
          describedBy={describedBy}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type === "tel" ? "tel" : field.type}
          inputMode={field.type === "tel" ? "tel" : undefined}
          value={value}
          onChange={(event) => {
            const next =
              field.type === "tel"
                ? formatRuPhone(event.target.value)
                : event.target.value;
            onChange(next);
          }}
          placeholder={field.placeholder}
          autoComplete={
            field.type === "tel"
              ? "tel"
              : field.type === "email"
                ? "email"
                : field.name === "name"
                  ? "name"
                  : "off"
          }
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={control}
        />
      )}

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-small text-fg-muted">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
