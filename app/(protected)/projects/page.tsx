"use client";

import { AddNewProjectDialog } from "@/components/projects/AddNewProjectDialog";

function ProjectPage() {
  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between hover:pointer">
        <h1 className="text-3xl font-bold">Projects</h1>
        <AddNewProjectDialog />
      </div>
    </div>
  );
}

export default ProjectPage;
