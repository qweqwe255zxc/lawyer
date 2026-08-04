"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { ContactDetailCards } from "../parts/ContactDetailCards";
import { FormColumn } from "../parts/FormColumn";
import { useContactForm } from "../parts/useContactForm";
import type { ContactFormProps } from "../types";

/**
 * То же деление 5/7, что и у Split, но реквизиты — не список на
 * линейках, а сетка карточек (parts/ContactDetailCards). Форма
 * по-прежнему проходит через FormColumn и слушается layout — эта ось
 * не привязана к variant, см. docs/section-system.md, раздел 7.
 */
export function Boxed(props: ContactFormProps) {
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
          <ContactDetailCards
            contacts={contacts}
            detailsTitle={detailsTitle}
            mapSrc={mapSrc}
            showMap={showMap}
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
      </Container>

      <Toast toast={form.toast} onClose={form.closeToast} />
    </Section>
  );
}

export default Boxed;
