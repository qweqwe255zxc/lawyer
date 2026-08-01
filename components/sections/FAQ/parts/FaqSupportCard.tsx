import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import type { FaqSupport } from "@/types/site";

/** Карточка «Остались вопросы?» в боковой колонке split-sidebar. */
export function FaqSupportCard({ support }: { support: FaqSupport }) {
  const Icon = getIcon(support.icon);

  return (
    <Card variant="framed" className="mt-8">
      <div className="flex items-start gap-4">
        {Icon ? (
          <span className="icon-tile shrink-0">
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </span>
        ) : null}

        <div>
          <p className="font-display text-h4">{support.title}</p>
          <p className="mt-2 text-small text-fg-muted">{support.text}</p>
          <Button
            href={support.action.href}
            variant="quiet"
            className="mt-3"
          >
            {support.action.label}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default FaqSupportCard;
