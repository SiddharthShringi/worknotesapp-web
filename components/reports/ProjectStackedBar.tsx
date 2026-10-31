import { formatDuration } from "@/lib/utils/dateFn";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";

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
    <div
      className="mt-4 flex h-9 w-full overflow-hidden rounded-lg sm:h-11"
      role="img"
      aria-label={`Time distribution across ${visibleProjects.length} projects`}
    >
      {visibleProjects.map((project) => {
        const width = (project.duration / totalDuration) * 100;

        // Only show duration when the segment has enough space.
        const showLabel = width >= 12;

        const indicatorColor = PROJECT_COLOR_MAP[project.color].bg;

        return (
          <div
            key={project.id}
            className={`flex h-full shrink-0 items-center justify-center overflow-hidden ${indicatorColor}`}
            style={{ width: `${width}%` }}
            title={`${project.name}: ${formatDuration(project.duration)}`}
          >
            {showLabel && (
              <span className="truncate px-1 text-xs font-semibold leading-none text-white sm:px-2 sm:text-sm">
                {formatDuration(project.duration)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
