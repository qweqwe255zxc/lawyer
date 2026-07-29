import Image from "next/image";
import { getIcon } from "@/lib/icons";
import type { FeatureItem } from "@/types/site";

/**
 * Содержимое одной услуги: фото, иконка, заголовок, текст, список пунктов.
 * Общее для всех раскладок — варианты отличаются оболочкой (ячейка сетки
 * или карточка), а не содержимым.
 *
 * Иконка сидит в .icon-tile: в «Экономе» плашки нет вообще (нулевой
 * паддинг, прозрачный фон — визуально голая иконка цвета fg-muted), в
 * «Стандарте» — акцентная плашка. Цвет иконка НАСЛЕДУЕТ от плашки,
 * поэтому text-* на самой иконке ставить нельзя.
 *
 * Фото — фиксированный бокс aspect-[4/3] с .ui-media, а не произвольные
 * width/height: см. docs/section-system.md, раздел 2.
 */
export function FeatureContent({ item }: { item: FeatureItem }) {
  const Icon = getIcon(item.icon);

  return (
    <>
      {item.photo ? (
        <div className="ui-media relative mb-5 aspect-[4/3] w-full overflow-hidden">
          <Image
            src={item.photo}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {Icon ? (
        <span className="icon-tile">
          <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </span>
      ) : null}

      <h3 className="mt-5 font-display text-h3">{item.title}</h3>
      <p className="mt-3 max-w-[46ch] text-body text-fg-muted">{item.text}</p>

      {item.points && item.points.length > 0 ? (
        <ul className="mt-6 space-y-2.5">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3 text-small text-fg-muted">
              <span aria-hidden="true" className="select-none">
                —
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default FeatureContent;
