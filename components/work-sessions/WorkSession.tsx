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
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-2xl bg-muted-foreground"></div>
          <p className="text-xl font-medium text-foreground">{intent}</p>
          <Badge className={`${PROJECT_COLOR_MAP[project.color]}`}>
            <Folder />
            {project.name}
          </Badge>
          <div className="flex items-center gap-1 font-semibold">
            <Clock className="text-muted-foreground" size={14} />
            <span className="text-sm text-muted-foreground">
              {format(new Date(started_at), "h:mm a")}
            </span>
          </div>
        </div>
        <p className="text-lg font-bold text-foreground">
          {formatDuration(Number(duration) || 0)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground mt-1">
          <div className="prose prose-sm">
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
        </div>
      </div>
    </div>
  );
}
