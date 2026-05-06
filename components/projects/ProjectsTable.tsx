"use client";

import { useState } from "react";
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
  const querKey = status === "all" ? ["projects"] : ["projects", { status }];
  const queryFn =
    status === "all" ? () => getProjects() : () => getProjects({ status });

  const { data, isLoading } = useQuery({
    queryKey: querKey,
    queryFn: queryFn,
  });

  const projects = (data as Project[]) || [];

  if (!isLoading && projects.length === 0) {
    return <EmptyProjects />;
  }

  return (
    <Table className="my-5">
      <TableHeader>
        <TableRow>
          <TableHead className="px-2">Name</TableHead>
          <TableHead className="px-2">Description</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="text-right px-2">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => <TableSkeletonRow key={i} />)}
        {!isLoading &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              handleEditProject={handleEditProject}
            />
          ))}
      </TableBody>
    </Table>
  );
}
