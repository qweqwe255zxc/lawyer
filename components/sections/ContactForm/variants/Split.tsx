"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Toast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
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
    order = "form-first",
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

  const formFirst = order === "form-first";

  return (
    <Section id={id} surface={surface}>
      <Container>
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        {/* lg (1024), а не md (768): на 768–1023px 7/12-колонка формы
            слишком узкая для полей в 2 ряда (sm:grid-cols-2 у
            ContactFields, см. parts/ContactFields.tsx) — лейблы то
            переносились на вторую строку, то нет, ряд читался рваным.
            Ниже lg секция теперь одноколоночная (уже была так до 768),
            с lg сразу получает 5/7-колонки, но при ширине, где для формы
            физически хватает места. */}
        <div className="mt-14 grid gap-x-gutter gap-y-14 lg:mt-20 lg:grid-cols-12">
          <ContactDetails
            contacts={contacts}
            detailsTitle={detailsTitle}
            // order-* — только ниже lg (см. выше, там же контейнер ещё
            // одноколоночный): по умолчанию форма первая, реквизиты
            // вторичны. С lg колонки идут бок о бок, порядок в DOM снова
            // решает сам variant (реквизиты слева) — lg:order-none.
            className={cn("lg:order-none lg:col-span-5", formFirst && "order-2")}
          />

          <FormColumn
            form={form}
            fields={fields}
            submitLabel={submitLabel}
            consent={consent}
            layout={layout}
            columnClassName={cn("lg:order-none lg:col-span-7", formFirst && "order-1")}
          />
        </div>

        {showMap && mapSrc ? <ContactMap mapSrc={mapSrc} /> : null}
      </Container>

      <Toast toast={form.toast} onClose={form.closeToast} />
    </Section>
  );
}

export default Split;
