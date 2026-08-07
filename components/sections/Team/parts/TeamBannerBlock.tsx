import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { TeamBanner } from "@/types/site";

interface TeamBannerBlockProps {
  banner: TeamBanner;
  /**
   * soft  — обычная карточка (Card variant="framed").
   * solid — акцентная заливка (data-surface="accent").
   * quote — акцентная левая рамка, без подложки.
   */
  tone?: "soft" | "solid" | "quote";
  className?: string;
}

/**
 * Баннер «Хотите к нам?» под сеткой людей. Данные одни и те же
 * (title/text/action), оправу выбирает `tone` — три референса рисуют её
 * по-разному, но ни один не вводит нового поля.
 */
export function TeamBannerBlock({ banner, tone = "soft", className }: TeamBannerBlockProps) {
  if (tone === "quote") {
    return (
      <div
        className={cn(
          "flex flex-col gap-6 border-l-2 border-accent py-2 pl-6 md:flex-row md:items-center md:justify-between",
          className,
        )}
      >
        <div>
          <p className="font-heading text-h3">{banner.title}</p>
          <p className="mt-2 text-body text-fg-muted">{banner.text}</p>
        </div>
        <Button href={banner.action.href} variant={banner.action.variant ?? "primary"}>
          {banner.action.label}
        </Button>
      </div>
    );
  }

  const content = (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-heading text-h3">{banner.title}</p>
        <p className="mt-2 text-body text-fg-muted">{banner.text}</p>
      </div>
      <Button href={banner.action.href} variant={banner.action.variant ?? "primary"}>
        {banner.action.label}
      </Button>
    </div>
  );

  if (tone === "solid") {
    return (
      <div data-surface="accent" className={cn("rounded-card bg-bg text-fg", className)}>
        <Card variant="framed">{content}</Card>
      </div>
    );
  }

  return (
    <Card variant="framed" className={className}>
      {content}
    </Card>
  );
}

export default TeamBannerBlock;
