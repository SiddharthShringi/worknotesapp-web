import { ProjectSession } from "@/types/report.types";
import { formatDuration, formatTime } from "@/lib/utils/dateFn";
import { SessionNotes } from "./SessionNotes";

interface SessionItemProps {
  session: ProjectSession;
}

export function SessionItem({ session }: SessionItemProps) {
  return (
    <div className="space-y-3 rounded-md px-3 py-2">
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto] sm:gap-x-3">
        {/* Session time */}
        <span className="whitespace-nowrap text-sm font-medium text-muted-foreground tabular-nums md:text-base">
          {formatTime(session.started_at)}
        </span>

        {/* Separator */}
        <span className="hidden text-muted-foreground sm:inline">·</span>

        {/* Session intent */}
        <p className="order-last col-span-2 min-w-0 break-words text-base font-medium leading-6 sm:order-none sm:col-span-1 sm:truncate">
          {session.intent}
        </p>

        {/* Duration */}
        <span className="justify-self-end whitespace-nowrap rounded-md bg-muted px-2.5 py-1.5 text-sm font-medium tabular-nums text-muted-foreground">
          {formatDuration(session.duration)}
        </span>
      </div>

      <SessionNotes notes={session.notes} />
    </div>
  );
}
