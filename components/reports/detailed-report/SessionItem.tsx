import { MessageSquare } from "lucide-react";

import { ProjectSession } from "@/types/report.types";
import { formatDuration, formatTime } from "@/lib/utils/dateFn";
import { SessionNotes } from "./SessionNotes";

interface SessionItemProps {
  session: ProjectSession;
}

export function SessionItem({ session }: SessionItemProps) {
  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatTime(session.started_at)}
          </span>

          <span className="text-muted-foreground">·</span>

          <p className="text-xs font-medium truncate">{session.intent}</p>
        </div>

        <span className="text-xs rounded bg-muted px-2 py-1 whitespace-nowrap">
          {formatDuration(session.duration)}
        </span>
      </div>

      <SessionNotes notes={session.notes} />
    </div>
  );
}
