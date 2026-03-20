import axiosInstance from "./axios";
import { WorkSessionParams } from "@/types/workSession.types";

export const createWorkSession = async (params: WorkSessionParams) => {
  const response = await axiosInstance.post("api/v1/work_sessions", params);
  return response;
};

export const stopWorkSession = async (workSessionId: number) => {
  const response = await axiosInstance.patch(
    `api/v1/api/v1/work_sessions/${workSessionId}/stop`,
  );
  return response;
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
