"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical } from "lucide-react";
import { getProjects } from "@/lib/api/project.api";
import { Project } from "@/types/project.types";
import { ProjectRow } from "./ProjectRow";

export function ProjectsTable() {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const status = (project: Project) => {
    if (project.archived) {
      return (
        <Badge className="bg-brand-graphite text-foreground">Archived</Badge>
      );
    }
    return (
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Active
      </Badge>
    );
  };

  return (
    <Table className="my-20">
      <TableCaption>A list of your Projects.</TableCaption>
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
          <ProjectRow key={project.id} project={project} />
        ))}
      </TableBody>
    </Table>
  );
}
