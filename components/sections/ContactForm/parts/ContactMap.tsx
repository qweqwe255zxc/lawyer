import { cn } from "@/lib/cn";

interface ContactMapProps {
  mapSrc: string;
  className?: string;
}

/**
 * Карта полосой во всю ширину блока, под реквизитами и формой — не
 * втиснута в узкую колонку реквизитов (там при aspect-ratio 4/3 она
 * либо превращалась в непропорционально высокую полосу на всю колонку,
 * либо просто плохо читалась). Читают split/stacked.
 */
export function ContactMap({ mapSrc, className }: ContactMapProps) {
  return (
    <div
      className={cn(
        "ui-media-raised mt-14 overflow-hidden border border-rule md:mt-16",
        className,
      )}
    >
      <iframe
        src={mapSrc}
        loading="lazy"
        title="Карта проезда"
        className="block w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
        style={{ border: 0, aspectRatio: "21 / 9" }}
      />
    </div>
  );
}

export default ContactMap;
