import { FilePlusCorner, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Controller, UseFormReturn } from "react-hook-form";
import { IdleWorkSessionFormData } from "@/lib/validations/workSession.schema";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/types/project.types";
import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";

type WorkSessionIdleProps = {
  form: UseFormReturn<IdleWorkSessionFormData>;
  projects: Project[];
};

export function WorkSessionIdle({ form, projects }: WorkSessionIdleProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          What&apos;s your next task?
        </h1>

        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Start a session by setting a clear intention
        </p>
      </div>
      <Card className="w-full">
        <CardContent className="p-4">
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
            className="flex items-end gap-3 w-full"
          >
            {/* Intent field */}
            <div className="flex-1">
              <Input
                className="h-11 shrink-0"
                id="intent"
                placeholder="What are your intent for this session?"
                {...register("intent")}
              />
            </div>
            {/* Project icon button */}
            <Controller
              control={control}
              name="projectId"
              render={({ field }) => {
                const selectedProject = projects.find(
                  (p) => p.id === field.value,
                );
                console.log({ value: field });
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-11 shrink-0">
                        {selectedProject ? (
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full border border-border ${
                                PROJECT_COLOR_MAP[selectedProject.color]
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
                          onClick={() => field.onChange(project.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full border border-border ${
                                PROJECT_COLOR_MAP[project.color]
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
              className="px-4 sm:px-6 md:px-8  flex items-center gap-2 shrink-0"
              size="xl"
              variant="brand"
            >
              Start Session
              <Play className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
