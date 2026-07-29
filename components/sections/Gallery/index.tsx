import { Grid } from "./variants/Grid";
import { Register } from "./variants/Register";
import type { VariantMap } from "../variantMap";
import type { GallerySection } from "@/types/site";

/**
 * Роутер секции Gallery (кейсы/работы). Единственный тёмный блок на
 * странице.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<
  GallerySection,
  NonNullable<GallerySection["variant"]>
> = {
  register: Register,
  grid: Grid,
};

export function Gallery(props: GallerySection) {
  const Variant = variants[props.variant ?? "register"] ?? Register;
  return <Variant {...props} />;
}

export default Gallery;
