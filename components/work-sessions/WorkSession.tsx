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
    <div className="flex gap-2">
      {/* Timeline */}
      <div className="flex flex-col items-center w-4">
        <div className="h-2 w-2 rounded-full bg-brand-yellow mt-2"></div>
        <div className="w-px flex-1 bg-border mt-1"></div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            {/* Intent */}
            <p className="text-base font-semibold text-foreground">{intent}</p>

            {/* Metadata */}
            <div className="flex items-center gap-3 mt-1">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-sm"
              >
                <Clock size={15} />
                <span>{format(new Date(started_at), "h:mm a")}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-sm"
              >
                <div
                  className={`h-2 w-2 rounded-lg border border-border ${
                    PROJECT_COLOR_MAP[project.color].bg
                  }`}
                />
                <span>{project.name}</span>
              </Badge>
            </div>
          </div>

          {/* Duration */}
          <p className="text-base font-semibold text-foreground/80 whitespace-nowrap">
            {formatDuration(Number(duration) || 0)}
          </p>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-2 w-full">
            <Markdown>{notes}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
