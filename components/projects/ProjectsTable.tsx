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
import { Project } from "@/types/project.types";
import { ProjectRow } from "./ProjectRow";

type ProjectsTableProps = {
  handleEditProject: (project: Project | null) => void;
  setEditingProject: (project: Project | null) => void;
};

export function ProjectsTable({
  handleEditProject,
  setEditingProject,
}: ProjectsTableProps) {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <Table className="my-20">
      <TableHeader>
        <TableRow>
          <TableHead className="px-2">Name</TableHead>
          <TableHead className="px-2">Description</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="text-right px-2">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            handleEditProject={handleEditProject}
            setEditingProject={setEditingProject}
          />
        ))}
      </TableBody>
    </Table>
  );
}
