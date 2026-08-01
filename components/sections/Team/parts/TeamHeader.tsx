import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface TeamHeaderProps {
  number?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  className?: string;
}

/**
 * Заголовок пилюлей по центру для photo-cards/badge-avatars/tags-cards —
 * тот же приём, что у Stats/Steps/Features/Gallery (`parts/*Header.tsx`).
 */
export function TeamHeader({ number, eyebrow, title, lead, className }: TeamHeaderProps) {
  if (!eyebrow && !title && !lead) return null;

  return (
    <div className={cn("mx-auto max-w-[46rem] text-center", className)}>
      {number ? (
        <p className="tabular text-caption font-medium uppercase text-fg-muted" data-reveal>
          {number}
        </p>
      ) : null}

      {eyebrow ? (
        <div data-reveal>
          <Badge variant="soft" className="uppercase">
            {eyebrow}
          </Badge>
        </div>
      ) : null}

      {title ? (
        <h2 className="mx-auto mt-4 font-heading text-h1" data-reveal>
          {title}
        </h2>
      ) : null}

      {lead ? (
        <p className="mx-auto mt-5 max-w-[56ch] text-lead text-fg-muted" data-reveal>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export default TeamHeader;
