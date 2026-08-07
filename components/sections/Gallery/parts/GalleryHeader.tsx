import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { CtaLink } from "@/types/site";

interface GalleryHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  action?: CtaLink;
  className?: string;
}

/**
 * Заголовок пилюлей для cards-icon/photo-grid/photo-bento — тот же
 * приём, что у Stats/Steps/Features (`parts/*Header.tsx`), компонент
 * свой для секции. Здесь заголовок слева, кнопка `action` — справа: в
 * отличие от Stats/Steps этот заголовок не центрирован, у реестра
 * кейсов обычно есть действие («Экспорт», «Все кейсы»), под которое
 * нужна вторая колонка.
 */
export function GalleryHeader({
  number,
  eyebrow,
  title,
  lead,
  action,
  className,
}: GalleryHeaderProps) {
  if (!number && !eyebrow && !title && !lead) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-[42rem]">
        {number ? (
          <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
            {number}
          </p>
        ) : null}

        {eyebrow ? (
          <div data-reveal>
            <Badge variant="soft" className="uppercase">
              {eyebrow}
            </Badge>
          </div>
        ) : null}

        {title ? (
          <h2 className="mt-4 font-heading section-title-scale" data-reveal>
            {title}
          </h2>
        ) : null}

        {lead ? (
          <p className="mt-4 text-lead text-fg-muted" data-reveal>
            {lead}
          </p>
        ) : null}
      </div>

      {action ? (
        <div data-reveal>
          <Button href={action.href} variant={action.variant ?? "secondary"}>
            {action.label}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default GalleryHeader;
