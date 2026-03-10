import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project.types";
import { EllipsisVertical } from "lucide-react";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { ActionMenu } from "./ActionMenu";

export const ProjectRow = ({ project }: { project: Project }) => {
  const status = (project: Project) => {
    if (project.archived) {
      return (
        <Badge className="bg-secondary text-secondary-foreground">
          Archived
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
        Active
      </Badge>
    );
  };
  const { id, name, description } = project;
  return (
    <TableRow key={id}>
      <TableCell className="font-semibold py-6 px-2">
        <div className="flex items-center gap-2">
          <div
            className={`h-4 w-4 rounded-md border border-border ${
              PROJECT_COLOR_MAP[project.color]
            }`}
          />
          {name}
        </div>
      </TableCell>
      <TableCell className="py-6 px-2">
        <div className="max-w-lg whitespace-normal wrap-break-word text-muted-foreground">
          {description}
        </div>
      </TableCell>
      <TableCell className="py-6 px-2">{status(project)}</TableCell>
      <TableCell className="flex justify-end py-6 px-2">
        <ActionMenu archived={project.archived} />
      </TableCell>
    </TableRow>
  );
};
