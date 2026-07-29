import { Badge } from "@/components/ui/Badge";
import type { CaseItem } from "@/types/site";

/**
 * Теги кейса — мелкие моноширинные плашки под категорией. Отдельной
 * колонки не занимают: их количество у разных кейсов разное, и колонка
 * переменной высоты ломала бы ровные строки реестра.
 */
export function CaseTags({ tags }: { tags?: CaseItem["tags"] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <span className="mt-2.5 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </span>
  );
}

export default CaseTags;
