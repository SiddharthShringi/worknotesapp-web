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
    <section className="space-y-5 p-4 sm:p-5">
      {/* Project Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        {/* Project Name and Session Count */}
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <span className={`h-3 w-3 shrink-0 rounded-full ${indicatorColor}`} />

          <h4 className="min-w-0 break-words text-base font-semibold leading-6 sm:text-lg">
            {project.name}
          </h4>

          <span className="whitespace-nowrap rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {pluralize(project.sessions.length, "session")}
          </span>
        </div>

        {/* Total Duration */}
        <p className="whitespace-nowrap text-sm text-muted-foreground">
          Total:{" "}
          <span className="font-semibold text-foreground tabular-nums">
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
