import Image from "next/image";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  mark: string;
  alt: string;
  className?: string;
}

/** brand.mark — это либо короткий текстовый знак ("К&П"), либо локальный
 * путь к файлу лого (`/images/...`). Определяем по ведущему слэшу и
 * рендерим соответственно — картинку через next/image или span с акцентом. */
const isImagePath = (value: string) => value.startsWith("/");

export function BrandMark({ mark, alt, className }: BrandMarkProps) {
  if (isImagePath(mark)) {
    return (
      <Image
        src={mark}
        alt={alt}
        width={160}
        height={40}
        className={cn("h-8 w-auto object-contain", className)}
        priority
      />
    );
  }

  return <span className={cn("text-accent", className)}>{mark}</span>;
}

export default BrandMark;
