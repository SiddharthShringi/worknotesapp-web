"use client";

import { useEffect, useState } from "react";
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
import { WorkSessionRunning } from "./WorkSessionRunning";
import { WorkSessionCompleted } from "./WorkSessionCompleted";
import { getActiveWorkSession } from "@/lib/api/workSession.api";

export function WorkSessionContainer() {
  // const [workStage, setWorkStage] = useState<WorkSessionStage>("running");
  const [localWorkSession, setLocalWorkSession] = useState<WorkSession | null>(
    null,
  );

  const { data: projects = [], isLoading: loadingProjects } = useQuery<
    Project[]
  >({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: activeSession, isLoading: loadingActiveSession } = useQuery({
    queryKey: ["activeWorkSession"],
    queryFn: getActiveWorkSession,
  });

  const idleWorkSessionForm = useForm<IdleWorkSessionFormData>({
    defaultValues: {
      intent: "",
      projectId: undefined,
    },
    resolver: zodResolver(idleWorkSessionSchema),
  });

  if (loadingProjects || loadingActiveSession) {
    return <div>Loading...</div>;
  }

  const workSession = localWorkSession ?? activeSession ?? null;
  const workStage = !workSession
    ? "idle"
    : !workSession.ended_at
      ? "running"
      : "completed";

  const onWorkSessionStart = (workSession: WorkSession) => {
    setLocalWorkSession(workSession);
  };

  return (
    <>
      {workStage === "idle" && (
        <WorkSessionIdle
          form={idleWorkSessionForm}
          projects={projects}
          onWorkSessionStart={onWorkSessionStart}
        />
      )}
      {workStage === "running" && (
        <WorkSessionRunning
          workSession={workSession}
          setLocalWorkSession={setLocalWorkSession}
        />
      )}
      {workStage === "completed" && <WorkSessionCompleted />}
    </>
  );
}
