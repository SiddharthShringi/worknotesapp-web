import { getLocalDate, getLabel } from "./dateFn";
import { WorkSessionData } from "@/types/workSession.types";

export const groupSessionsByDate = (sessions: WorkSessionData[]) => {
  const grouped: Record<string, WorkSessionData[]> = {};

  // 1. Group by date
  for (const session of sessions) {
    const date = getLocalDate(session.started_at);

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(session);
  }

  // 2. Convert to required format
  const result = Object.entries(grouped)
    .map(([date, sessions]) => ({
      date,
      label: getLabel(date),
      sessions,
    }))
    // 3. Sort latest first
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return result;
};
