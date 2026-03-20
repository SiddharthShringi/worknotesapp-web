"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import {
  IdleWorkSessionFormData,
  idleWorkSessionSchema,
} from "@/lib/validations/workSession.schema";
import { WorkSession, WorkSessionStage } from "@/types/workSession.types";
import { getProjects } from "@/lib/api/project.api";
import { Project } from "@/types/project.types";
import { WorkSessionIdle } from "./WorkSessionIdle";

export function WorkSession() {
  const [workStage, setWorkStage] = useState<WorkSessionStage>("idle");
  const [workSession, setworkSession] = useState<WorkSession | null>(null);

  const { data: projects = [], isLoading: loadingProjects } = useQuery<
    Project[]
  >({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const idleWorkSessionForm = useForm<IdleWorkSessionFormData>({
    resolver: zodResolver(idleWorkSessionSchema),
  });

  return (
    <div>
      <WorkSessionIdle form={idleWorkSessionForm} projects={projects} />
    </div>
  );
}
