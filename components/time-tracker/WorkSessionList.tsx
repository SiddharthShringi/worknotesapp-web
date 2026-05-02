"use client";

import { useQuery } from "@tanstack/react-query";
import { WorkSessionData } from "@/types/workSession.types";
import { getWorkSessions } from "@/lib/api/workSession.api";
import { groupSessionsByDate } from "../../lib/utils/utilFns";
import { formatDuration } from "@/lib/utils/dateFn";
import { Card, CardContent } from "../ui/card";
import { FolderPen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DateLabel from "../work-sessions/DateLabel";
import WorkSession from "../work-sessions/WorkSession";

export function WorkSessionList() {
  const { data: workSessions = [], isLoading: loadingWorkSessions } = useQuery<
    WorkSessionData[]
  >({
    queryKey: ["workSessions"],
    queryFn: getWorkSessions,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (loadingWorkSessions) {
    return <div>Loading...</div>;
  }

  const groupedSessions = groupSessionsByDate(workSessions);

  console.log("Grouped Sessions: ", groupedSessions);

  return (
    <div>
      {groupedSessions.length === 0 ? (
        <p className="text-muted-foreground mt-4">No work sessions found.</p>
      ) : (
        groupedSessions.map((group) => (
          <div key={group.date} className="mt-6">
            <DateLabel label={group.label} />
            <ul className="space-y-3">
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
