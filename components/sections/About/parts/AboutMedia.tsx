import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { AboutSection } from "@/types/site";

interface AboutMediaProps {
  photo: string;
  photoAlt?: string;
  /** plain — просто панель; browser — полоса окна сверху, без паддингов. */
  frame?: AboutSection["frame"];
  /** Акцентные пятна за карточкой (split-actions, decorative: true). */
  decorative?: boolean;
  className?: string;
}

/**
 * Медиа-панель во второй колонке split-actions/quiet-split/dark — тот
 * же приём, что у Hero showcase
 * (Hero/parts/HeroPanel.tsx): Card variant="elevated", frame="browser"
 * добавляет полосу окна сверху и снимает паддинги.
 */
export function AboutMedia({
  photo,
  photoAlt,
  frame = "plain",
  decorative = false,
  className,
}: AboutMediaProps) {
  const browser = frame === "browser";

  return (
    <div className={cn("relative", className)}>
      {decorative ? (
        <>
          {/* Меньший bleed на мобильном (-left-4/-top-4, 16px): гуттер там
              floor-ится к 20px (--layout-gutter), и полный -6 (24px) вылезал
              за его пределы — секция получала реальный горизонтальный скролл. */}
          <span
            aria-hidden="true"
            className="absolute -left-4 -top-4 -z-10 size-24 rounded-full bg-accent/20 sm:-left-6 sm:-top-6"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 size-20 rotate-6 rounded-2xl bg-accent/15 sm:-bottom-6 sm:-right-6"
          />
        </>
      ) : null}

      <Card
        variant="elevated"
        padded={!browser}
        className={browser ? "overflow-hidden" : undefined}
      >
        {browser ? (
          <div
            aria-hidden="true"
            className="flex items-center gap-2 border-b border-rule px-5 py-4"
          >
            <span className="size-2.5 rounded-full bg-rule-strong" />
            <span className="size-2.5 rounded-full bg-rule-strong" />
            <span className="size-2.5 rounded-full bg-rule-strong" />
          </div>
        ) : null}

        <div
          className={
            browser
              ? "relative aspect-[4/3] w-full"
              : "ui-media relative aspect-[4/3] w-full overflow-hidden"
          }
        >
          <Image
            src={photo}
            alt={photoAlt ?? ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Card>
    </div>
  );
}

export default AboutMedia;
