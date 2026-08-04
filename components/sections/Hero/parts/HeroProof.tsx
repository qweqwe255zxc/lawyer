import Image from "next/image";
import { revealDelay } from "@/lib/reveal";
import type { HeroProof as HeroProofData } from "@/types/site";

/**
 * Строка доверия под кнопками: стопка аватаров внахлёст и короткая
 * фраза («Нас выбрали 400 семей»). Живёт в первой колонке, а не отдельной
 * секцией, потому что работает только рядом с CTA — это последний
 * аргумент перед нажатием, а не самостоятельный блок.
 *
 * Аватары декоративные (aria-hidden): смысл несёт текст рядом, а
 * озвучивать «четыре фотографии людей» экранному диктору незачем.
 * Кольцо вокруг каждого — цвет фона секции, а не белый: на тёмной
 * поверхности белая обводка выглядела бы вырезанной наклейкой.
 *
 * Больше четырёх аватаров не рендерим: дальше стопка превращается в
 * кашу из перекрытых на 60% лиц, а число всё равно называет текст.
 */
const MAX_AVATARS = 4;

export function HeroProof({ proof }: { proof: HeroProofData }) {
  const avatars = (proof.avatars ?? []).slice(0, MAX_AVATARS);

  return (
    <div
      className="mt-10 flex items-center gap-4"
      data-reveal
      style={revealDelay(3)}
    >
      {avatars.length > 0 ? (
        <div aria-hidden="true" className="flex -space-x-3">
          {avatars.map((src) => (
            <span
              key={src}
              className="relative size-10 overflow-hidden rounded-full border-2 border-bg bg-rule"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="40px"
                className="object-cover grayscale"
              />
            </span>
          ))}
        </div>
      ) : null}

      <p className="text-small text-fg-muted">{proof.text}</p>
    </div>
  );
}

export default HeroProof;
