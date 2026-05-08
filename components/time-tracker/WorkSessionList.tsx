"use client";

import { useQuery } from "@tanstack/react-query";
import { GroupedWorkSessions } from "@/types/workSession.types";
import { getWorkSessions } from "@/lib/api/workSession.api";
import DateLabel from "../work-sessions/DateLabel";
import WorkSession from "../work-sessions/WorkSession";
import { getLabel, formatDuration } from "@/lib/utils/dateFn";

export function WorkSessionList() {
  const { data: groupedSessions = [], isLoading: loadingWorkSessions } =
    useQuery<GroupedWorkSessions[]>({
      queryKey: ["workSessions"],
      queryFn: getWorkSessions,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  if (loadingWorkSessions) {
    return <div>Loading...</div>;
  }

  console.log("Grouped Sessions:", groupedSessions);

  return (
    <div>
      {groupedSessions.length === 0 ? (
        <p className="text-muted-foreground mt-4">No work sessions found.</p>
      ) : (
        groupedSessions.map((group) => (
          <div key={group.date} className="mt-6">
            <DateLabel
              label={getLabel(group.date)}
              duration={formatDuration(Number(group.total_duration) || 0)}
            />
            <ul className="space-y-4">
              {group.sessions.map((session) => (
                <WorkSession key={session.id} session={session} />
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
