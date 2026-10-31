import { MessageSquare } from "lucide-react";

import { hasNotes, formatNotes } from "@/lib/utils/dateFn";

interface SessionNotesProps {
  notes: string | null;
}

export function SessionNotes({ notes }: SessionNotesProps) {
  if (!notes || !hasNotes(notes)) {
    return null;
  }

  const items = formatNotes(notes);

  return (
    <div className="rounded-md bg-muted/50 px-3 py-2">
      <div className="flex items-start gap-2">
        <MessageSquare className="h-3 w-3 mt-0.5 text-muted-foreground shrink-0" />

        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-xs text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
