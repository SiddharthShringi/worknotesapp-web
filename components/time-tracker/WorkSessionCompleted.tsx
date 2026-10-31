"use client";

import { useForm, Controller } from "react-hook-form";

import {
  workSessionSchema,
  WorkSessionFormData,
} from "@/lib/validations/workSession.schema";

import { cn } from "@/lib/utils";
import { WorkSession } from "@/types/workSession.types";
import { Project } from "@/types/project.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlusCorner, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkSession } from "@/lib/api/workSession.api";
import { toast } from "sonner";

type WorkSessionCompletedProps = {
  workSession: WorkSession;
  projects: Project[];
  setLocalWorkSession: React.Dispatch<React.SetStateAction<WorkSession | null>>;
};

export function WorkSessionCompleted({
  workSession,
  projects,
  setLocalWorkSession,
}: WorkSessionCompletedProps) {
  const { intent, project_id, notes } = workSession;
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<WorkSessionFormData>({
    defaultValues: {
      intent,
      projectId: project_id ?? undefined,
      notes: notes ?? "",
    },
    resolver: zodResolver(workSessionSchema),
  });

  const handleComplete = () => {
    setLocalWorkSession(null);

    queryClient.invalidateQueries({ queryKey: ["activeWorkSession"] });
    queryClient.invalidateQueries({ queryKey: ["workSessions"] });
  };

  const mutation = useMutation({
    mutationFn: updateWorkSession,
    onSuccess: () => {
      toast.success("Added Notes successfully");
      handleComplete();
    },
    onError: () => {
      toast.error("Failed to Add Notes. Please try again.");
    },
  });

  const onSubmit = (data: WorkSessionFormData) => {
    mutation.mutate({
      workSessionId: workSession.id,
      params: {
        work_session: {
          intent: data.intent,
          project_id: data.projectId ?? undefined,
          notes: data.notes as string | undefined,
        },
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-3 space-y-0.5 sm:mb-4">
        <h2 className="text-lg font-semibold leading-7 tracking-tight text-foreground sm:text-xl">
          Work session completed
        </h2>

        <p className="text-sm leading-5 text-muted-foreground">
          Reflect and save your session
        </p>
      </div>

      <Card className="rounded-xl">
        <CardContent className="p-3 sm:p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4"
          >
            {/* Intent and Project */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_192px] sm:gap-3 sm:items-start">
              {/* Intent */}
              <div className="min-w-0 space-y-1">
                <label
                  htmlFor="intent"
                  className="text-sm font-medium text-foreground"
                >
                  What did you work on?
                </label>

                <Input
                  id="intent"
                  placeholder="Describe your task"
                  aria-invalid={!!errors.intent}
                  {...register("intent")}
                  className="h-9 text-sm sm:text-base"
                />

                {errors.intent && (
                  <p className="text-xs leading-5 text-destructive">
                    {errors.intent.message}
                  </p>
                )}
              </div>

              {/* Project */}
              <Controller
                control={control}
                name="projectId"
                render={({ field }) => {
                  const selectedProject = projects.find(
                    (p) => p.id === field.value,
                  );

                  return (
                    <div className="min-w-0 space-y-1">
                      <label className="text-sm font-medium text-foreground">
                        Project
                      </label>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "h-9 w-full justify-start gap-2 px-3 text-sm font-normal",
                              errors.projectId &&
                                !field.value &&
                                "border-destructive",
                            )}
                          >
                            {selectedProject ? (
                              <>
                                <span
                                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                                    PROJECT_COLOR_MAP[selectedProject.color].bg
                                  }`}
                                />
                                <span className="truncate">
                                  {selectedProject.name}
                                </span>
                              </>
                            ) : (
                              <>
                                <FilePlusCorner className="h-4 w-4 shrink-0 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  Select project
                                </span>
                              </>
                            )}
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start" className="w-56">
                          {projects.map((project) => (
                            <DropdownMenuItem
                              key={project.id}
                              onClick={() => {
                                field.onChange(project.id);
                                clearErrors("projectId");
                              }}
                            >
                              <span
                                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                                  PROJECT_COLOR_MAP[project.color].bg
                                }`}
                              />
                              <span className="truncate">{project.name}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {errors.projectId && (
                        <p className="text-xs leading-5 text-destructive">
                          {errors.projectId.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <label
                  htmlFor="notes"
                  className="text-sm font-medium text-foreground"
                >
                  Session notes
                </label>

                <span className="text-xs text-muted-foreground">
                  Markdown supported
                </span>
              </div>

              <Textarea
                id="notes"
                placeholder="Add key points, progress, decisions, or next steps..."
                rows={3}
                {...register("notes")}
                className="min-h-24 resize-y text-sm leading-6 sm:text-base"
              />

              {errors.notes && (
                <p className="text-xs leading-5 text-destructive">
                  {errors.notes.message}
                </p>
              )}
            </div>

            {/* Save */}
            <div className="flex justify-end border-t pt-3">
              <Button
                type="submit"
                size="default"
                disabled={mutation.isPending}
                className="h-9 gap-2 px-5 text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                {mutation.isPending ? "Saving..." : "Save session"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
