"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { AxiosError } from "axios";
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
  DialogTrigger,
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
import { createProject } from "@/lib/api/project.api";
import { mapErrors, ErrorResponse } from "@/lib/api/errorMapping";

export function AddNewProjectDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = mapErrors<ProjectFormData>(error, setError);
      toast.error(message || "Failed to create project. Please try again.");
    },
    onSuccess: () => {
      toast.success("Project created successfully");
      reset();
      setOpen(false);
    },
  });

  const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
    const payload: ProjectParams = {
      project: {
        name: data.name,
        description: data.description,
        color: data.color,
      },
    };
    console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-brand-yellow text-background bg-foreground">
          <Plus className="h-4 w-4" />
          <p>Add New Project</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <DialogHeader>
            <DialogTitle>Add new Project</DialogTitle>
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
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
