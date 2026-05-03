import { Controller, UseFormReturn, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { IdleWorkSessionFormData } from "@/lib/validations/workSession.schema";
import { Input } from "@/components/ui/input";
import { FilePlusCorner, Zap } from "lucide-react";
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
  const {
    register,
    control,
    handleSubmit,
    setError,
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
      toast.success("Created Work Session successfully");
    },
  });

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
    <div>
      <div className="flex flex-col items-center justify-center text-center mb-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          What&apos;s your next task?
        </h1>

        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          Start a session by setting a clear intention
        </p>
      </div>
      <Card className="w-full">
        <CardContent className="p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start gap-3 w-full"
          >
            {/* Intent field */}
            <div className="flex flex-col flex-1">
              <Input
                className="h-11 shrink-0"
                id="intent"
                placeholder="What is your intent for this session?"
                aria-invalid={!!errors.intent}
                {...register("intent")}
              />
              {errors.intent && (
                <p className="text-destructive text-sm min-h-[20px] mt-1">
                  {errors.intent?.message || ""}
                </p>
              )}
            </div>
            {/* Project icon button */}
            <Controller
              control={control}
              name="projectId"
              render={({ field }) => {
                const selectedProject = projects.find(
                  (p) => p.id === field.value,
                );
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-11 shrink-0",
                          errors.projectId &&
                            !field.value &&
                            "border-destructive!",
                        )}
                      >
                        {selectedProject ? (
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full border border-border ${
                                PROJECT_COLOR_MAP[selectedProject.color].bg
                              }`}
                            />
                            {selectedProject.name}
                          </div>
                        ) : (
                          <>
                            <FilePlusCorner className="h-6 w-6" />
                            Project
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {projects.map((project) => (
                        <DropdownMenuItem
                          key={project.id}
                          onClick={() => {
                            field.onChange(project.id);
                            clearErrors("projectId");
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full border border-border ${
                                PROJECT_COLOR_MAP[project.color].bg
                              }`}
                            />
                            {project.name}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }}
            />
            <Button
              type="submit"
              className="px-4 sm:px-6 md:px-8 flex items-center shrink-0"
              size="xl"
              variant="brand"
            >
              <Zap className="h-2 w-2" />
              Start
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
