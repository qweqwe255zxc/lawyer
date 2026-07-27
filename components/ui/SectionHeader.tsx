import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** Линейка во всю ширину над шапкой — базовый разделитель разделов. */
  rule?: boolean;
  className?: string;
}

/**
 * Шапка раздела: номер и колонтитул — на левое поле, заголовок и лид —
 * в основную колонку. Номер и колонтитул всегда fg-muted, без акцента.
 */
export function SectionHeader({
  number,
  eyebrow,
  title,
  lead,
  rule = true,
  className,
}: SectionHeaderProps) {
  if (!number && !eyebrow && !title && !lead) return null;

  return (
    <header
      className={cn(
        "grid gap-x-gutter gap-y-6 md:grid-cols-12",
        rule && "border-t border-rule pt-7 md:pt-9",
        className,
      )}
      data-reveal
    >
      {(number || eyebrow) && (
        <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-3">
          {number ? (
            <span className="tabular text-caption font-medium uppercase text-fg-muted">
              {number}
            </span>
          ) : null}
          {eyebrow ? (
            <span className="text-caption font-medium uppercase text-fg-muted">
              {eyebrow}
            </span>
          ) : null}
        </div>
      )}

      <div className={cn(number || eyebrow ? "md:col-span-9" : "md:col-span-12")}>
        {title ? (
          <h2 className="max-w-[22ch] font-heading text-h2">{title}</h2>
        ) : null}
        {lead ? (
          <p className="mt-5 max-w-[58ch] text-lead text-fg-muted">{lead}</p>
        ) : null}
      </div>
    </header>
  );
}

export default SectionHeader;
