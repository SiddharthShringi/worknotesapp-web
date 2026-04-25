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
import { useMutation } from "@tanstack/react-query";
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

  const mutation = useMutation({
    mutationFn: updateWorkSession,
    onSuccess: () => {
      toast.success("Added Notes successfully");
      setLocalWorkSession(null);
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Work Session Completed
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Reflect and save your session
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Row: Intent + Project */}
            <div className="flex gap-3 items-start">
              {/* Intent */}
              <div className="flex flex-col flex-1">
                <Input
                  id="intent"
                  placeholder="What was your intent?"
                  aria-invalid={!!errors.intent}
                  {...register("intent")}
                />
                {errors.intent && (
                  <p className="text-destructive text-sm mt-1">
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
                    <div className="flex flex-col">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-10 shrink-0 min-w-[140px] justify-start",
                              errors.projectId &&
                                !field.value &&
                                "border-destructive",
                            )}
                          >
                            {selectedProject ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full border ${
                                    PROJECT_COLOR_MAP[selectedProject.color]
                                  }`}
                                />
                                {selectedProject.name}
                              </div>
                            ) : (
                              <>
                                <FilePlusCorner className="h-4 w-4" />
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
                                  className={`h-3 w-3 rounded-full border ${
                                    PROJECT_COLOR_MAP[project.color]
                                  }`}
                                />
                                {project.name}
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {errors.projectId && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.projectId.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <Textarea
                placeholder="Add notes about this session..."
                rows={5}
                {...register("notes")}
              />
              {errors.notes && (
                <p className="text-destructive text-sm">
                  {errors.notes.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-6 flex gap-2">
                Save Session
                <Save className="size-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
