import { ProjectSession } from "@/types/report.types";
import { SessionItem } from "./SessionItem";

interface SessionTimelineProps {
  sessions: ProjectSession[];
  indicatorColor: string;
}

export function SessionTimeline({
  sessions,
  indicatorColor,
}: SessionTimelineProps) {
  return (
    <div className="relative space-y-3 pl-5">
      {/* Vertical timeline line */}
      <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border" />

      {sessions.map((session) => (
        <div key={session.id} className="relative">
          {/* Timeline dot */}
          <span
            className={`absolute -left-5 top-3 h-2 w-2 rounded-full ${indicatorColor}`}
          />

          <SessionItem session={session} />
        </div>
      ))}
    </div>
  );
}
