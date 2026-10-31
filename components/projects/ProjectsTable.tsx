"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjects } from "@/lib/api/project.api";
import { Project, ProjectStatus } from "@/types/project.types";
import { ProjectRow } from "./ProjectRow";
import { TableSkeletonRow } from "./TableSkeletonRow";
import { EmptyProjects } from "./EmptyProjects";

type ProjectsTableProps = {
  handleEditProject: (project: Project | null) => void;
  status: ProjectStatus;
};

export function ProjectsTable({
  handleEditProject,
  status,
}: ProjectsTableProps) {
  const queryKey = status === "all" ? ["projects"] : ["projects", { status }];
  const queryFn =
    status === "all" ? () => getProjects() : () => getProjects({ status });

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  const projects = (data as Project[]) || [];

  if (!isLoading && projects.length === 0) {
    return <EmptyProjects />;
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg sm:my-5">
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-10 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Description
              </TableHead>
              <TableHead className="h-10 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="h-10 px-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableSkeletonRow key={i} />
              ))}

            {!isLoading &&
              projects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  handleEditProject={handleEditProject}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
