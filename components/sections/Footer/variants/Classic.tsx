import { Container } from "@/components/ui/Container";
import { BottomBar } from "../parts/BottomBar";
import { FooterColumns } from "../parts/FooterColumns";
import { SocialLinks } from "../parts/SocialLinks";
import type { FooterProps } from "../types";

/**
 * Корпоративный футер: вордмарк обычного начертания (не капслок, как
 * в Bold) и более просторный ритм — mt-16 вместо mt-12, колонки шире.
 * Данные те же, что и у Bold: одна и та же схема footer.columns/social,
 * разница только в оформлении.
 */
export function Classic({ brand, footer }: FooterProps) {
  return (
    <footer data-surface="paper" className="bg-bg text-fg">
      <div className="border-t border-rule pt-14 md:pt-20">
        <Container>
          <div className="grid gap-x-gutter gap-y-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-heading text-h3 font-bold">{brand.name}</p>
              <p className="mt-3 max-w-[34ch] text-small text-fg-muted">
                {brand.description}
              </p>

              {footer.social ? <SocialLinks items={footer.social} className="mt-6" /> : null}
            </div>

            {footer.columns ? (
              <div className="md:col-span-8">
                <FooterColumns columns={footer.columns} />
              </div>
            ) : null}
          </div>

          <BottomBar
            legalName={brand.legalName}
            links={footer.links}
            note={footer.note}
            className="mt-4"
          />
        </Container>
      </div>
    </footer>
  );
}

export default Classic;
