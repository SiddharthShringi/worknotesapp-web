import { MessageSquare } from "lucide-react";

import Markdown from "@/components/work-sessions/Markdown";

interface SessionNotesProps {
  notes: string | null;
}

export function SessionNotes({ notes }: SessionNotesProps) {
  if (!notes) {
    return null;
  }

  return (
    <div className="rounded-md bg-muted/50 px-3 py-2.5 sm:px-4">
      <div className="flex items-start gap-2.5">
        <MessageSquare
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />

        <Markdown>{notes}</Markdown>
      </div>
    </div>
  );
}
