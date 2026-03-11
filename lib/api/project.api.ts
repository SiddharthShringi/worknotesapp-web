import axiosInstance from "./axios";
import { ProjectParams, ProjectArchieveParams } from "@/types/project.types";

export const createProject = async (params: ProjectParams) => {
  const response = await axiosInstance.post("api/v1/projects", params);
  return response;
};

export const getProjects = async () => {
  const response = await axiosInstance.get("api/v1/projects");
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

export const deleteProject = async (projectId: string) => {
  const response = await axiosInstance.delete(`api/v1/projects/${projectId}`);
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
