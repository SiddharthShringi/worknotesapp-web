import { ProjectReport } from "@/types/report.types";
import { SessionTimeline } from "./SessionTimeline";
import { formatDuration } from "@/lib/utils/dateFn";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { pluralize } from "@/lib/utils";

interface ProjectSectionProps {
  project: ProjectReport;
}

export function ProjectSection({ project }: ProjectSectionProps) {
  const indicatorColor = PROJECT_COLOR_MAP[project.color].bg;

  return (
    <section className="rounded-xl border p-4 space-y-4">
      {/* Project Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${indicatorColor}`} />

          <h4 className="text-sm font-semibold">{project.name}</h4>

          <span className="text-xs text-muted-foreground rounded bg-muted px-2 py-1">
            {pluralize(project.sessions.length, "session")}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Total:{" "}
          <span className="font-semibold text-foreground">
            {formatDuration(project.duration)}
          </span>
        </p>
      </div>

      {/* Sessions */}
      <SessionTimeline
        sessions={project.sessions}
        indicatorColor={indicatorColor}
      />
    </section>
  );
}
