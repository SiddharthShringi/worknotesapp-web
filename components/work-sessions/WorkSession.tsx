import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { Badge } from "../ui/badge";
import { formatDuration } from "@/lib/utils/dateFn";
import { WorkSessionData } from "@/types/workSession.types";
import { Clock, Folder } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type WorkSessionProps = {
  session: WorkSessionData;
};

export default function WorkSession({ session }: WorkSessionProps) {
  const { intent, duration, project, started_at, notes } = session;
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center w-4">
        <div className="h-3 w-3 rounded-full bg-brand-yellow mt-1"></div>
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
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Folder size={14} />
                <span>{project.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{format(new Date(started_at), "h:mm a")}</span>
              </div>
            </div>
          </div>

          {/* Duration */}
          <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {formatDuration(Number(duration) || 0)}
          </p>
        </div>

        {/* Notes */}
        {notes && (
          <div className="prose prose-sm mt-2 text-muted-foreground">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                ul: ({ children }) => (
                  <ul className="list-disc pl-5">{children}</ul>
                ),
              }}
            >
              {notes}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
