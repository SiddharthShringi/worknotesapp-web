import { PROJECT_COLORS } from "@/lib/constants/project-colors";

export interface ProjectParams {
  project: {
    name: string;
    description?: string;
    color: string;
  };
}

export interface ProjectArchieveParams {
  project: {
    archived: boolean;
  };
}

export type ProjectColor = (typeof PROJECT_COLORS)[number]["value"];

export interface Project {
  id: number;
  name: string;
  description?: string;
  color: ProjectColor;
  archived: boolean;
}
