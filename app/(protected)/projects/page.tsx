"use client";

import { AddNewProjectDialog } from "@/components/projects/AddNewProjectDialog";
import { ProjectsTable } from "@/components/projects/ProjectsTable";

function ProjectPage() {
  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between hover:pointer">
        <h1 className="text-3xl font-bold">Projects</h1>
        <AddNewProjectDialog />
      </div>
      <ProjectsTable />
    </div>
  );
}

export default ProjectPage;
