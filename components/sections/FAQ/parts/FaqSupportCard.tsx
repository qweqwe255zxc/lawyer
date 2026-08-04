import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import type { FaqSupport } from "@/types/site";

interface FaqSupportCardProps {
  support: FaqSupport;
  className?: string;
}

/**
 * Карточка «Остались вопросы?» — во всю ширину секции под аккордеоном
 * (split-sidebar), поэтому текст и кнопка стоят в строку, а не
 * колонкой: на всю ширину узкая колонка текста слева и пустота справа
 * выглядела бы недоделанной.
 */
export function FaqSupportCard({ support, className }: FaqSupportCardProps) {
  const Icon = getIcon(support.icon);

  return (
    <Card variant="framed" className={cn(className)}>
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          {Icon ? (
            <span className="icon-tile shrink-0">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </span>
          ) : null}

          <div>
            <p className="font-display text-h4">{support.title}</p>
            <p className="mt-2 text-small text-fg-muted">{support.text}</p>
          </div>
        </div>

        <Button href={support.action.href} variant="secondary" className="shrink-0">
          {support.action.label}
        </Button>
      </div>
    </Card>
  );
}

export default FaqSupportCard;
