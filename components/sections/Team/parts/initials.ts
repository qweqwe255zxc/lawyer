/**
 * Инициалы для заглушки аватара, когда у участника нет `photo`.
 * Общий хелпер: раньше эту же строку дублировал только
 * `MemberContent.tsx`, из-за чего в остальных 4 вариантах Team без фото
 * рендерился просто пустой bg-rule бокс без подписи.
 */
export function getInitials(name: string): string {
  const parts = name.split(" ");
  return `${parts[1]?.[0] ?? ""}${parts[0]?.[0] ?? ""}`.toUpperCase();
}
