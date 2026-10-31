import { ProjectColor } from "./project.types";
export interface GetReportParams {
  date: string;
}

export interface DailyReport {
  date: string;
  total_duration: number;
  total_sessions: number;
  first_session_start: string | null;
  last_session_end: string | null;
  projects: ProjectReport[];
}

export interface ProjectReport {
  id: number;
  color: ProjectColor;
  name: string;
  duration: number;
  sessions: ProjectSession[];
}

export interface ProjectSession {
  id: number;
  intent: string;
  started_at: string | null;
  project?: {
    name: string;
    color: ProjectColor;
  };
  duration: number;
  notes: string;
}
