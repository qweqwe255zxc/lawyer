import { Bold } from "./variants/Bold";
import { Centered } from "./variants/Centered";
import { Classic } from "./variants/Classic";
import { Compact } from "./variants/Compact";
import { Default } from "./variants/Default";
import { Glass } from "./variants/Glass";
import { Gradient } from "./variants/Gradient";
import { Split } from "./variants/Split";
import type { VariantMap } from "../variantMap";
import type { FooterProps } from "./types";
import type { FooterVariant } from "@/types/site";

/**
 * Роутер футера. Вариант — поле footer.variant (FooterConfig в
 * types/site.ts), а не отдельный проп: конфиг футера остаётся одним
 * объектом, как и остальные его поля (note, legal, links, columns...).
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<FooterProps, FooterVariant> = {
  default: Default,
  bold: Bold,
  classic: Classic,
  compact: Compact,
  gradient: Gradient,
  centered: Centered,
  glass: Glass,
  split: Split,
};

export function Footer(props: FooterProps) {
  const Variant = variants[props.footer.variant ?? "default"] ?? Default;
  return <Variant {...props} />;
}

export default Footer;
