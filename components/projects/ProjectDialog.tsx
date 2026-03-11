"use client";

import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/projects/ColorPicker";
import { ProjectParams } from "@/types/project.types";
import {
  ProjectFormData,
  projectSchema,
} from "@/lib/validations/project.schema";
import { FormField } from "../FormField";
import { createProject, updateProject } from "@/lib/api/project.api";
import { mapErrors, ErrorResponse } from "@/lib/api/errorMapping";
import { Project } from "@/types/project.types";

type ProjectDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: Project | null;
  setEditingProject: (project: Project | null) => void;
};

export function ProjectDialog({
  open,
  setOpen,
  project,
  setEditingProject,
}: ProjectDialogProps) {
  const isEditMode = !!project;
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProjectFormData>({
    defaultValues: {
      name: "",
      description: "",
      color: "blue",
    },
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description ?? "",
        color: project.color,
      });
    } else {
      reset({
        name: "",
        description: "",
        color: "blue",
      });
    }
  }, [project, reset]);

  const queryClient = useQueryClient();

  const createProjectMutation = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    ProjectParams
  >({ mutationFn: createProject });

  const updateProjectMutation = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    { projectId: string; params: ProjectParams }
  >({ mutationFn: updateProject });

  const handleError = (
    error: AxiosError<ErrorResponse>,
    action: "create" | "update",
  ) => {
    const message = mapErrors<ProjectFormData>(error, setError);

    toast.error(message || `Failed to ${action} project. Please try again.`);
  };

  const handleSuccess = (action: "create" | "update") => {
    toast.success(
      action === "create"
        ? "Project created successfully"
        : "Project updated successfully",
    );

    reset();
    setEditingProject(null);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    setOpen(false);
  };

  const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
    const payload: ProjectParams = {
      project: {
        name: data.name,
        description: data.description,
        color: data.color,
      },
    };

    if (isEditMode && project) {
      updateProjectMutation.mutate(
        { projectId: project.id, params: payload },
        {
          onError: (error) => handleError(error, "update"),
          onSuccess: () => handleSuccess("update"),
        },
      );
    } else {
      createProjectMutation.mutate(payload, {
        onError: (error) => handleError(error, "create"),
        onSuccess: () => handleSuccess("create"),
      });
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setEditingProject(null);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for your new project.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <FormField
              label="Name"
              id="name"
              registration={register("name")}
              error={errors.name?.message}
            />
            <FormField
              label="Description"
              id="description"
              textarea
              registration={register("description")}
              error={errors.description?.message}
            />
            <Field>
              <Label htmlFor="username-1">Color</Label>
              <Controller
                control={control}
                name="color"
                defaultValue="blue"
                render={({ field }) => (
                  <ColorPicker value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isEditMode && !isDirty}>
              {isEditMode ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
