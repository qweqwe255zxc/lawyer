import type { ReactNode } from "react";

/**
 * Временный QA-стенд для аудита адаптивности (см. .claude/plans).
 * Не является частью продукта — удаляется после аудита.
 */
export function QaLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        background: "#000",
        color: "#39ff14",
        fontFamily: "monospace",
        fontSize: 13,
        lineHeight: 1.4,
        padding: "6px 16px",
        letterSpacing: "0.02em",
        wordBreak: "break-all",
      }}
    >
      {children}
    </div>
  );
}

export function QaBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <QaLabel>{label}</QaLabel>
      {children}
    </>
  );
}
