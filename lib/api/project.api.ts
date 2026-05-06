import axiosInstance from "./axios";
import {
  ProjectParams,
  ProjectArchieveParams,
  GetProjectsParams,
} from "@/types/project.types";

export const createProject = async (params: ProjectParams) => {
  const response = await axiosInstance.post("api/v1/projects", params);
  return response;
};

export const getProjects = async (params?: GetProjectsParams) => {
  const response = await axiosInstance.get("api/v1/projects", { params });
  return response.data;
};

export const updateProject = async ({
  projectId,
  params,
}: {
  projectId: string;
  params: ProjectParams;
}) => {
  const response = await axiosInstance.patch(
    `api/v1/projects/${projectId}`,
    params,
  );
  return response;
};

export const toggleArchiveProject = async ({
  projectId,
  params,
}: {
  projectId: string;
  params: ProjectArchieveParams;
}) => {
  const response = await axiosInstance.patch(
    `api/v1/projects/${projectId}`,
    params,
  );
  return response;
};
