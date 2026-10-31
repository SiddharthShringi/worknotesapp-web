"use client";

import { useState, useEffect } from "react";
import { Controller, UseFormReturn, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { cn } from "@/lib/utils";
import { IdleWorkSessionFormData } from "@/lib/validations/workSession.schema";
import { Input } from "@/components/ui/input";
import { FilePlusCorner, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { Project } from "@/types/project.types";
import { WorkSession, WorkSessionParams } from "@/types/workSession.types";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { createWorkSession } from "@/lib/api/workSession.api";
import { mapErrors, ErrorResponse } from "@/lib/api/errorMapping";
import { ProjectDialog } from "@/components/projects/ProjectDialog";

type WorkSessionIdleProps = {
  form: UseFormReturn<IdleWorkSessionFormData>;
  projects: Project[];
  onWorkSessionStart: (workSession: WorkSession) => void;
};

export function WorkSessionIdle({
  form,
  projects,
  onWorkSessionStart,
}: WorkSessionIdleProps) {
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [newProjectId, setNewProjectId] = useState<number | undefined>(
    undefined,
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = form;

  const mutation = useMutation({
    mutationFn: createWorkSession,

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = mapErrors<IdleWorkSessionFormData>(error, setError);

      toast.error(message || "Create Work Session Failed. Please try again.");
    },

    onSuccess: (response) => {
      reset();
      onWorkSessionStart(response.data);
      toast.success("Work session started successfully");
    },
  });

  useEffect(() => {
    if (newProjectId) {
      setValue("projectId", newProjectId);
      clearErrors("projectId");
    }
  }, [newProjectId, setValue, clearErrors]);

  const onSubmit: SubmitHandler<IdleWorkSessionFormData> = (data) => {
    const payload: WorkSessionParams = {
      work_session: {
        intent: data.intent,
        project_id: Number(data.projectId),
      },
    };

    mutation.mutate(payload);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 flex flex-col items-center text-center">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
          What&apos;s your next task?
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Set a clear intention and start your next focused session.
        </p>
      </div>

      {/* Session Form */}
      <Card className="w-full rounded-xl">
        <CardContent className="p-4 sm:p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-start"
          >
            {/* Intent Field */}
            <div className="min-w-0 flex-1">
              <label htmlFor="intent" className="sr-only">
                Session intention
              </label>

              <Input
                id="intent"
                className="h-11 w-full text-sm sm:text-base"
                placeholder="What do you want to accomplish?"
                aria-invalid={!!errors.intent}
                {...register("intent")}
              />

              {errors.intent && (
                <p className="mt-1.5 text-sm leading-5 text-destructive">
                  {errors.intent.message}
                </p>
              )}
            </div>

            {/* Project Selection and Start Action */}
            <div className="flex items-start gap-2 sm:shrink-0 sm:gap-3">
              {/* Project Selector */}
              <Controller
                control={control}
                name="projectId"
                render={({ field }) => {
                  const selectedProject = projects.find(
                    (project) => project.id === field.value,
                  );

                  return (
                    <div className="min-w-0 flex-1 sm:flex-none">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "h-11 w-full justify-center gap-2 px-3 text-sm font-medium sm:w-auto sm:max-w-[220px]",
                              errors.projectId &&
                                !field.value &&
                                "border-destructive",
                            )}
                            aria-invalid={!!errors.projectId && !field.value}
                          >
                            {selectedProject ? (
                              <>
                                <span
                                  className={cn(
                                    "h-2.5 w-2.5 shrink-0 rounded-full",
                                    PROJECT_COLOR_MAP[selectedProject.color].bg,
                                  )}
                                />

                                <span className="truncate">
                                  {selectedProject.name}
                                </span>
                              </>
                            ) : (
                              <>
                                <FilePlusCorner className="h-4 w-4 shrink-0" />
                                <span>Select Project</span>
                              </>
                            )}
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                          {projects.map((project) => (
                            <DropdownMenuItem
                              key={project.id}
                              onClick={() => {
                                field.onChange(project.id);
                                clearErrors("projectId");
                              }}
                            >
                              <span
                                className={cn(
                                  "h-3 w-3 shrink-0 rounded-full",
                                  PROJECT_COLOR_MAP[project.color].bg,
                                )}
                              />

                              <span className="truncate">{project.name}</span>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuItem
                            className="mt-1 border-t font-medium"
                            onSelect={() => setProjectDialogOpen(true)}
                          >
                            <Plus className="h-4 w-4" />
                            Add New Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {errors.projectId && (
                        <p className="mt-1.5 text-xs text-destructive">
                          {errors.projectId.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />

              {/* Start Button */}
              <Button
                type="submit"
                variant="brand"
                size="xl"
                disabled={mutation.isPending}
                className="h-11 shrink-0 gap-2 px-5 text-sm font-semibold sm:px-6"
              >
                <Zap className="h-4 w-4" />
                {mutation.isPending ? "Starting..." : "Start"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Project Dialog */}
      <ProjectDialog
        open={projectDialogOpen}
        setOpen={setProjectDialogOpen}
        project={null}
        setNewProjectId={setNewProjectId}
      />
    </div>
  );
}
