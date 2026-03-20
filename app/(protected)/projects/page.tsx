"use client";

import { useState } from "react";
import { ProjectDialog } from "@/components/projects/ProjectDialog";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Project } from "@/types/project.types";

function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEditProject = (project: Project | null) => {
    setEditingProject(project);
    setOpen(true);
  };

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between hover:pointer">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button
          className="hover:bg-brand-yellow text-background bg-foreground"
          onClick={() => {
            handleEditProject(editingProject);
          }}
        >
          <Plus className="h-4 w-4" />
          <p>Add New Project</p>
        </Button>
      </div>
      <ProjectsTable handleEditProject={handleEditProject} />
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
