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
    project_id?: string;
    notes?: string;
  };
}

export type WorkSessionStage = "idle" | "running" | "completed";
