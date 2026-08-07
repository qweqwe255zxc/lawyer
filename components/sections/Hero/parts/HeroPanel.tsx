import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { revealDelay } from "@/lib/reveal";
import type { HeroSection } from "@/types/site";

interface HeroPanelProps {
  image: string;
  alt: string;
  /**
   * Оправа медиа. plain — просто панель; browser — с полосой окна
   * (три точки) сверху, как в референсах со скриншотом продукта.
   */
  frame: NonNullable<HeroSection["frame"]>;
}

/**
 * Медиа во второй колонке showcase: не голое фото, а панель — то есть
 * объект со своей поверхностью и глубиной тарифа (Card variant="elevated").
 * Именно этим showcase отличается от split, где фото лежит на фоне секции.
 *
 * Паддинги зависят от оправы, и это не вкусовщина:
 *
 * — plain: паддинги ЕСТЬ, медиа вложено в панель с полями. Без них
 *   картинка закрывает поверхность карточки целиком, и панель
 *   перестаёт отличаться от обычного поднятого фото (ui-media-raised) —
 *   то есть вариант теряет ровно то, чем отличается от split.
 * — browser: паддингов НЕТ, полоса оправы и скриншот доходят до края
 *   оболочки. Поясок фона между рамкой и содержимым разрушил бы
 *   метафору окна.
 *
 * Точки оправы — нейтральные (--color-rule-strong), а не «красная,
 * жёлтая, зелёная». Светофорные кружки macOS в этом шаблоне были бы
 * тремя новыми цветами вне палитры ради декора; форма окна читается и
 * без них.
 */
export function HeroPanel({ image, alt, frame }: HeroPanelProps) {
  const browser = frame === "browser";

  return (
    <div data-reveal style={revealDelay(1)}>
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

        {/* ui-media только у вложенного медиа: у скриншота в оправе
            браузера скругление уже держит сама карточка (overflow-hidden),
            а второй радиус внутри первого дал бы двойной контур. */}
        <div
          className={
            browser
              ? "relative aspect-[4/3] w-full"
              : "ui-media-inset relative aspect-[4/3] w-full overflow-hidden"
          }
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Card>
    </div>
  );
}

export default HeroPanel;
