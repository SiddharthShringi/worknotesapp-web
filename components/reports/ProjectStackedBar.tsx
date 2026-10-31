import { formatDuration } from "@/lib/utils/dateFn";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Project {
  id: number;
  name: string;
  color: string;
  duration: number; // Duration in minutes
}

interface StackedBarProps {
  projects: Project[];
  totalDuration: number;
}

export function ProjectStackedBar({
  projects,
  totalDuration,
}: StackedBarProps) {
  const visibleProjects = projects.filter((project) => project.duration > 0);

  if (totalDuration <= 0 || visibleProjects.length === 0) {
    return (
      <div
        className="mt-4 h-8 w-full rounded-lg bg-muted sm:h-10"
        role="img"
        aria-label="No recorded project time"
      />
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            tabIndex={0}
            className="mt-4 flex h-9 w-full cursor-pointer overflow-hidden rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-11"
            role="img"
            aria-label={`Time distribution across ${visibleProjects.length} projects. Focus or hover to view the project breakdown.`}
          >
            {visibleProjects.map((project) => {
              const width = (project.duration / totalDuration) * 100;
              const showLabel = width >= 12;
              const indicatorColor = PROJECT_COLOR_MAP[project.color].bg;

              return (
                <div
                  key={project.id}
                  className={`flex h-full shrink-0 items-center justify-center overflow-hidden ${indicatorColor}`}
                  style={{ width: `${width}%` }}
                >
                  {showLabel && (
                    <span className="truncate px-1 text-xs font-semibold leading-none text-slate-100 dark:text-slate-800 sm:px-2 sm:text-sm">
                      {formatDuration(project.duration)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          align="center"
          className="w-64 rounded-lg border border-border bg-popover fill-popover p-3 text-popover-foreground shadow-md"
        >
          <div className="mb-2 text-xs font-semibold text-muted-foreground">
            PROJECT BREAKDOWN
          </div>

          <div className="space-y-2">
            {visibleProjects.map((project) => {
              const indicatorColor = PROJECT_COLOR_MAP[project.color].bg;

              return (
                <div
                  key={project.id}
                  className="flex min-w-0 items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${indicatorColor}`}
                    />
                    <span className="truncate text-sm">{project.name}</span>
                  </div>

                  <span className="shrink-0 text-sm font-semibold tabular-nums">
                    {formatDuration(project.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
