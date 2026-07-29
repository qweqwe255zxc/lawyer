import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { GallerySection } from "@/types/site";

/**
 * Оболочка секции кейсов: поверхность, шапка, отбивка и сноска.
 * Общая для всех раскладок — варианты отличаются только тем, что стоит
 * между шапкой и сноской.
 *
 * surface="ink" по умолчанию — единственный тёмный блок на странице.
 * Акцента тут нет вообще.
 */
export function GalleryShell({
  id,
  surface = "ink",
  number,
  eyebrow,
  title,
  lead,
  note,
  children,
}: GallerySection & { children: ReactNode }) {
  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className="mt-14 md:mt-20">
          {children}

          {note ? (
            <p className="mt-8 max-w-[62ch] text-small text-fg-muted">{note}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default GalleryShell;
