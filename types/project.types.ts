export interface ProjectParams {
  project: {
    name: string;
    description?: string;
    color: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  archived: boolean;
}
