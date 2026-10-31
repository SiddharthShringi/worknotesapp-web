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
    <div className="rounded-md bg-muted/50 px-3 py-2.5 sm:px-4">
      <div className="flex items-start gap-2.5">
        <MessageSquare
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />

        <ul className="min-w-0 space-y-1.5">
          {items.map((item, index) => (
            <li
              key={index}
              className="break-words text-sm leading-6 text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
