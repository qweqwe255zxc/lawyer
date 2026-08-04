"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { ContactDetails } from "../parts/ContactDetails";
import { ContactMap } from "../parts/ContactMap";
import { FormColumn } from "../parts/FormColumn";
import { useContactForm } from "../parts/useContactForm";
import type { ContactFormProps } from "../types";

/**
 * Реквизиты слева (5/12), форма справа (7/12). Вариант по умолчанию во
 * всех тарифах. Карта — не в узкой колонке реквизитов, а отдельной
 * полосой во всю ширину блока под ним, см. parts/ContactMap.tsx.
 */
export function Split(props: ContactFormProps) {
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
    showMap = true,
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

        <div className="mt-14 grid gap-x-gutter gap-y-14 md:mt-20 md:grid-cols-12">
          <ContactDetails
            contacts={contacts}
            detailsTitle={detailsTitle}
            className="md:col-span-5"
          />

          <FormColumn
            form={form}
            fields={fields}
            submitLabel={submitLabel}
            consent={consent}
            layout={layout}
            columnClassName="md:col-span-7"
          />
        </div>

        {showMap && mapSrc ? <ContactMap mapSrc={mapSrc} /> : null}
      </Container>

      <Toast toast={form.toast} onClose={form.closeToast} />
    </Section>
  );
}

export default Split;
