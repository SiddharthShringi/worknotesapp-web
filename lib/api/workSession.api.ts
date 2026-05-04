import axiosInstance from "./axios";
import { WorkSessionParams } from "@/types/workSession.types";

export const getWorkSessions = async () => {
  const response = await axiosInstance.get("api/v1/work_sessions");
  return response.data;
};

export const createWorkSession = async (params: WorkSessionParams) => {
  const response = await axiosInstance.post("api/v1/work_sessions", params);
  return response;
};

export const getActiveWorkSession = async () => {
  const response = await axiosInstance.get("api/v1/work_sessions/active");
  return response.data;
};

export const stopWorkSession = async (workSessionId: number) => {
  const response = await axiosInstance.patch(
    `api/v1/work_sessions/${workSessionId}/stop`,
  );
  return response.data;
};

export const updateWorkSession = async ({
  workSessionId,
  params,
}: {
  workSessionId: number;
  params: WorkSessionParams;
}) => {
  const response = await axiosInstance.patch(
    `api/v1/work_sessions/${workSessionId}`,
    params,
  );
  return response;
};
