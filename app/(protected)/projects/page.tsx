"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectDialog } from "@/components/projects/ProjectDialog";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Project, ProjectStatus } from "@/types/project.types";
import ProjectFilterTabs from "@/components/projects/ProjectFilterTabs";
import { getProjects } from "@/lib/api/project.api";

function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<ProjectStatus>("active");

  const handleEditProject = (project: Project | null) => {
    setEditingProject(project);
    setOpen(true);
  };

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between hover:pointer">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button
          variant="brand"
          onClick={() => {
            handleEditProject(editingProject);
          }}
        >
          <Plus className="h-4 w-4" />
          <p>Add New Project</p>
        </Button>
      </div>
      <ProjectFilterTabs status={status} setStatus={setStatus} />
      <ProjectsTable handleEditProject={handleEditProject} status={status} />
      <ProjectDialog
        open={open}
        setOpen={setOpen}
        project={editingProject}
        setEditingProject={setEditingProject}
      />
    </div>
  );
}

export default ProjectPage;
