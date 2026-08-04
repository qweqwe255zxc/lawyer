import { Bold } from "./variants/Bold";
import { Centered } from "./variants/Centered";
import { Classic } from "./variants/Classic";
import { Compact } from "./variants/Compact";
import { Default } from "./variants/Default";
import { Glass } from "./variants/Glass";
import { Monogram } from "./variants/Monogram";
import { Split } from "./variants/Split";
import type { VariantMap } from "../variantMap";
import type { HeaderProps } from "./types";
import type { HeaderVariant } from "@/types/site";

/**
 * Роутер хедера. Собственного поля variant у site.config.sections нет
 * (Header не проходит через SectionRenderer), ручка приходит из
 * siteConfig.header.variant — см. types/site.ts.
 *
 * Сам роутер серверный, клиентский только вариант: стейт меню и слушатель
 * скролла живут в variants/*.tsx и parts/useHeaderState.ts, поэтому
 * в клиентский бандл не уезжает ничего лишнего.
 *
 * Как добавить новый дизайн — docs/section-system.md, раздел 7.
 */
const variants: VariantMap<HeaderProps, HeaderVariant> = {
  default: Default,
  bold: Bold,
  classic: Classic,
  compact: Compact,
  monogram: Monogram,
  centered: Centered,
  glass: Glass,
  split: Split,
};

export function Header(props: HeaderProps) {
  const Variant = variants[props.variant ?? "default"] ?? Default;
  return <Variant {...props} />;
}

export default Header;
