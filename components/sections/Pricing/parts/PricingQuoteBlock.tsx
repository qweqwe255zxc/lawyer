import Image from "next/image";
import { cn } from "@/lib/cn";

interface PricingQuoteBlockProps {
  quote: { text: string; author: string; photo: string };
  className?: string;
}

/**
 * Цитата поверх фото под тарифами (как Hero/parts/HeroOverlay.tsx, но
 * центрированная и во всю ширину блока). Раньше жила только в variants/
 * Quote.tsx — вынесена сюда, чтобы `quote` можно было задать при любом
 * variant, а не только там, где для неё случайно нашлось место в вёрстке.
 */
export function PricingQuoteBlock({ quote, className }: PricingQuoteBlockProps) {
  return (
    <div
      className={cn("ui-media-raised relative aspect-[21/9] w-full overflow-hidden", className)}
      data-reveal
    >
      <Image src={quote.photo} alt="" fill sizes="100vw" className="object-cover grayscale" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="ui-popover max-w-[36rem] bg-card p-8 text-center md:p-10">
          <p className="italic text-lead">{quote.text}</p>
          <p className="mt-4 text-caption font-medium uppercase text-fg-muted">
            — {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PricingQuoteBlock;
