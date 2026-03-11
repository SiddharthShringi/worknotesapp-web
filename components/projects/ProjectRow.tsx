import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project.types";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { ActionMenu } from "./ActionMenu";
import { deleteProject, toggleArchiveProject } from "@/lib/api/project.api";
import { toast } from "sonner";

type ProjectRowProps = {
  project: Project;
  handleEditProject: (project: Project | null) => void;
  setEditingProject: (project: Project | null) => void;
};

export const ProjectRow = ({
  project,
  handleEditProject,
  setEditingProject,
}: ProjectRowProps) => {
  const { id, name, description } = project;

  const status = project.archived ? (
    <Badge className="min-w-[70px] justify-center bg-secondary text-secondary-foreground ">
      Archived
    </Badge>
  ) : (
    <Badge className="min-w-[70px] justify-center bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300">
      Active
    </Badge>
  );

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({ mutationFn: deleteProject });
  const toggleArchiveMutation = useMutation({
    mutationFn: toggleArchiveProject,
  });

  const handleToggleArchive = () => {
    setEditingProject(project);
    const payload = {
      projectId: project.id,
      params: { project: { archived: !project.archived } },
    };
    toggleArchiveMutation.mutate(payload, {
      onSuccess: () => {
        toast.success(
          `Project ${project.archived ? "activated" : "archived"} successfully`,
        );
        setEditingProject(null);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
    });
  };
  const handleDelete = () => {
    setEditingProject(project);
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Project deleted successfully");
        setEditingProject(null);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
    });
  };

  return (
    <TableRow key={id}>
      <TableCell className="font-semibold py-4 px-2">
        <div className="flex items-center gap-2">
          <div
            className={`h-4 w-4 rounded-full border border-border ${
              PROJECT_COLOR_MAP[project.color]
            }`}
          />
          {name}
        </div>
      </TableCell>
      <TableCell className="py-4 px-2">
        <div className="max-w-lg whitespace-normal wrap-break-word text-muted-foreground">
          {description}
        </div>
      </TableCell>
      <TableCell className="py-4 px-2">{status}</TableCell>
      <TableCell className="flex justify-end py-4 px-2">
        <ActionMenu
          archived={project.archived}
          onEdit={() => handleEditProject(project)}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
        />
      </TableCell>
    </TableRow>
  );
};
