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
 * Одна колонка: реквизиты сверху, форма под ними. Для узких страниц и
 * коротких форм. Карта — полосой во всю ширину под ними, см.
 * parts/ContactMap.tsx (та же раскладка карты, что и у split).
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

        {/* max-w-3xl + mx-auto: без ограничения ширины и реквизиты (dl на
            линейках), и поля формы растягивались во все 1240px контейнера —
            тонкие строки во всю ширину экрана читались как пустая,
            недоделанная страница. Раньше тут ещё стоял md:grid-cols-1 —
            no-op (1 колонка и так дефолт grid), реального разделения на
            md+ не было вовсе. */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-y-14 md:mt-20">
          <ContactDetails contacts={contacts} detailsTitle={detailsTitle} />

          <FormColumn
            form={form}
            fields={fields}
            submitLabel={submitLabel}
            consent={consent}
            layout={layout}
          />
        </div>

        {showMap && mapSrc ? <ContactMap mapSrc={mapSrc} /> : null}
      </Container>

      <Toast toast={form.toast} onClose={form.closeToast} />
    </Section>
  );
}

export default Stacked;
