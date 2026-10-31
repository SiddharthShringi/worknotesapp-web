import { ProjectReport } from "@/types/report.types";
import { ProjectSection } from "./ProjectSection";

interface ProjectListProps {
  projects: ProjectReport[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </div>
  );
}
