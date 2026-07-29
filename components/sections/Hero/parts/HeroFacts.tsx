import { revealDelay } from "@/lib/reveal";
import type { HeroFact } from "@/types/site";

/**
 * «Шапка дела»: три факта через вертикальные линейки под первым экраном.
 * Доступна всем раскладкам — в отличие от виджета, факты видны и на
 * мобильном, поэтому именно они (и секция stats) остаются местом для
 * чисел, если те нужны на узком экране.
 */
export function HeroFacts({ facts }: { facts: HeroFact[] }) {
  if (facts.length === 0) return null;

  return (
    <dl
      className="mt-16 grid border-t border-rule sm:grid-cols-3 md:mt-24"
      data-reveal
      style={revealDelay(3)}
    >
      {facts.map((fact, index) => (
        <div
          key={fact.value}
          className={
            index === 0
              ? "py-6 sm:pr-8"
              : "border-t border-rule py-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pr-8"
          }
        >
          <dt className="font-display text-h3">{fact.value}</dt>
          <dd className="mt-2 text-small text-fg-muted">{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default HeroFacts;
