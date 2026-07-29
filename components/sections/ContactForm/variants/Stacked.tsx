"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { ContactDetails } from "../parts/ContactDetails";
import { FormColumn } from "../parts/FormColumn";
import { useContactForm } from "../parts/useContactForm";
import type { ContactFormProps } from "../types";

/**
 * Одна колонка: реквизиты сверху, форма под ними. Для узких страниц и
 * коротких форм.
 *
 * Карта тут дополнительно ограничена по ширине (mx-auto max-w-md): в
 * одной колонке блок реквизитов растягивается на весь контейнер, и iframe
 * с aspectRatio 4/3 превратился бы в полосу ~930px высотой на весь экран.
 */
export function Stacked(props: ContactFormProps) {
  const {
    id,
    surface = "surface",
    layout = "plain",
    number,
    eyebrow,
    title,
    lead,
    detailsTitle,
    fields,
    submitLabel,
    consent,
    successTitle,
    successText,
    errorText,
    contacts,
    mapSrc,
  } = props;

  const form = useContactForm({
    fields,
    successTitle,
    successText,
    errorText,
  });

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className="mt-14 grid gap-x-gutter gap-y-14 md:mt-20 md:grid-cols-1">
          <ContactDetails
            contacts={contacts}
            detailsTitle={detailsTitle}
            mapSrc={mapSrc}
            mapClassName="mx-auto max-w-md"
          />

          <FormColumn
            form={form}
            fields={fields}
            submitLabel={submitLabel}
            consent={consent}
            layout={layout}
          />
        </div>
      </Container>

      <Toast toast={form.toast} onClose={form.closeToast} />
    </Section>
  );
}

export default Stacked;
