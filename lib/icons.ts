import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  FileSignature,
  Gavel,
  HandCoins,
  Home,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Star,
  Sun,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Реестр иконок вручную, а не динамический импорт всей библиотеки —
 * в бандл попадает только то, что реально используется в конфиге.
 *
 * Иконки везде красим в --color-fg-muted, акцентного цвета на иконках
 * в этом шаблоне быть не должно.
 */
export const icons = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  check: Check,
  chevronDown: ChevronDown,
  clock: Clock,
  fileSignature: FileSignature,
  gavel: Gavel,
  handCoins: HandCoins,
  home: Home,
  landmark: Landmark,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  moon: Moon,
  phone: Phone,
  scale: Scale,
  search: Search,
  send: Send,
  shieldCheck: ShieldCheck,
  star: Star,
  sun: Sun,
  users: Users,
  x: X,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name?: IconName): LucideIcon | null {
  if (!name) return null;
  return icons[name] ?? null;
}
