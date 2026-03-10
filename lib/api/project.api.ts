import axiosInstance from "./axios";
import { ProjectParams } from "@/types/project.types";

export const createProject = async (params: ProjectParams) => {
  const response = await axiosInstance.post("api/v1/projects", params);
  return response;
};

export const getProjects = async () => {
  const response = await axiosInstance.get("api/v1/projects");
  return response.data;
};
