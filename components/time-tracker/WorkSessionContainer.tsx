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

export function WorkSessionContainer() {
  const [workStage, setWorkStage] = useState<WorkSessionStage>("idle");
  const [workSession, setWorkSession] = useState<WorkSession | null>(null);

  const { data: projects = [], isLoading: loadingProjects } = useQuery<
    Project[]
  >({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const idleWorkSessionForm = useForm<IdleWorkSessionFormData>({
    defaultValues: {
      intent: "",
      projectId: undefined,
    },
    resolver: zodResolver(idleWorkSessionSchema),
  });

  const onWorkSessionStart = (workSession: WorkSession) => {
    setWorkSession(workSession);
    setWorkStage("running");
  };

  console.log({ workSession, workStage });

  return (
    <div>
      <WorkSessionIdle
        form={idleWorkSessionForm}
        projects={projects}
        onWorkSessionStart={onWorkSessionStart}
      />
    </div>
  );
}
