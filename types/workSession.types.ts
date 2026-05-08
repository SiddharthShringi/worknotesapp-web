export interface WorkSession {
  id: number;
  intent: string;
  notes: string | null;
  project_id: number | null;
  started_at: string;
  ended_at: string | null;
}

export interface WorkSessionParams {
  work_session: {
    intent?: string;
    project_id?: number;
    notes?: string;
  };
}

export interface WorkSessionData {
  id: number;
  intent: string;
  notes: string | null;
  project: {
    name: string;
    color: string;
  };
  started_at: string;
  ended_at: string | null;
  duration: string | null;
}

export interface GroupedWorkSessions {
  date: string;
  total_duration: string;
  sessions: WorkSessionData[];
}

export type WorkSessionStage = "idle" | "running" | "completed";
