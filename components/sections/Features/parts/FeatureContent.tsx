import Image from "next/image";
import { cn } from "@/lib/cn";
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
interface FeatureContentProps {
  item: FeatureItem;
  /**
   * stack (по умолчанию) — иконка над заголовком, документный тон
   * (table/table-links). inline — иконка и заголовок в одну строку: для
   * карточных раскладок (cards/cards-cta/bento), где у иконки уже есть
   * своя плашка и воздух карточки — стек над заголовком там читается
   * как два отдельных яруса вместо одного цельного заголовка.
   */
  iconLayout?: "stack" | "inline";
}

export function FeatureContent({ item, iconLayout = "stack" }: FeatureContentProps) {
  const Icon = getIcon(item.icon);
  const inline = iconLayout === "inline" && Boolean(Icon);

  const title = (
    <h3
      className={cn(
        "font-display text-h3",
        !inline && (item.photo || Icon) && "mt-5",
      )}
    >
      {item.title}
    </h3>
  );

  return (
    <>
      {/* shrink-0: в карточной раскладке содержимое сидит во flex-колонке,
          и бокс с фиксированным aspect-ratio обязан быть неусадочным —
          иначе в высоком ряду flex-shrink подминает ему высоту и фото
          перестают быть одного формата. */}
      {item.photo ? (
        <div className="ui-media relative mb-5 aspect-[4/3] w-full shrink-0 overflow-hidden">
          <Image
            src={item.photo}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {inline && Icon ? (
        <div className="flex items-center gap-4">
          <span className="icon-tile shrink-0">
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </span>
          {title}
        </div>
      ) : (
        <>
          {Icon ? (
            <span className="icon-tile">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </span>
          ) : null}

          {/* Верхний отступ заголовка нужен только под фото или плашкой
              иконки. Безусловный mt-5 добавлял его и первому элементу
              карточки, и в одном ряду карточки с иконкой и без неё
              начинались на разной высоте — при том, что вертикальный
              отступ уже даёт паддинг самой карточки. */}
          {title}
        </>
      )}
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
