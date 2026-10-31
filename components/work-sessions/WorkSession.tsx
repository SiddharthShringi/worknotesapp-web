import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { Badge } from "../ui/badge";
import { formatDuration } from "@/lib/utils/dateFn";
import { WorkSessionData } from "@/types/workSession.types";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import Markdown from "./Markdown";

type WorkSessionProps = {
  session: WorkSessionData;
};

export default function WorkSession({ session }: WorkSessionProps) {
  const { intent, duration, project, started_at, notes } = session;

  return (
    <div className="flex gap-3">
      {/* Timeline */}
      <div className="flex w-4 shrink-0 flex-col items-center">
        <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-yellow" />
        <div className="mt-1 w-px flex-1 bg-border" />
      </div>

      {/* Session Content */}
      <div className="min-w-0 flex-1 space-y-3 pb-5">
        {/* Session Header */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {/* Intent and Metadata */}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
            {/* Session Intent */}
            <h3 className="text-base font-semibold leading-6 text-foreground">
              {intent}
            </h3>

            {/* Started At */}
            <Badge
              variant="secondary"
              className="h-6 shrink-0 gap-1.5 px-2 text-xs font-medium text-foreground/80 sm:text-sm"
            >
              <Clock className="h-3.5 w-3.5" />
              <span className="tabular-nums">
                {format(new Date(started_at), "h:mm a")}
              </span>
            </Badge>

            {/* Project */}
            <Badge
              variant="secondary"
              className="h-6 max-w-full shrink gap-1.5 px-2 text-xs font-medium text-foreground/80 sm:text-sm"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  PROJECT_COLOR_MAP[project.color].bg
                }`}
              />
              <span className="truncate">{project.name}</span>
            </Badge>
          </div>

          {/* Duration */}
          <p className="shrink-0 whitespace-nowrap text-sm font-semibold tabular-nums text-foreground sm:text-base">
            {formatDuration(Number(duration) || 0)}
          </p>
        </div>

        {/* Session Notes */}
        {notes && (
          <div className="w-full text-sm leading-6 sm:text-base">
            <Markdown>{notes}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
