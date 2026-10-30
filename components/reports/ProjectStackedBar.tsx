import { formatDuration } from "@/lib/utils/dateFn";

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

  if (totalDuration === 0) {
    return <div className="h-3 w-full rounded-full bg-muted" />;
  }

  return (
    <div
      className="flex h-12 w-full overflow-hidden rounded-xl mt-4"
      role="img"
      aria-label="Time distribution by project"
    >
      {visibleProjects.map((project) => {
        const width = (project.duration / totalDuration) * 100;

        // Show the label only if the segment occupies at least 12%.
        const showLabel = width >= 12;

        return (
          <div
            key={project.id}
            className="flex h-full shrink-0 items-center justify-center overflow-hidden"
            style={{
              width: `${width}%`,
              backgroundColor: project.color,
            }}
            title={`${project.name}: ${formatDuration(project.duration)}`}
          >
            {showLabel && (
              <span className="truncate px-1 text-lg font-semibold text-white">
                {formatDuration(project.duration)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
