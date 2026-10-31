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
    <div className="relative space-y-4 pl-6">
      {/* Vertical timeline line */}
      <div className="absolute left-[5px] top-[23px] bottom-0 w-px bg-border" />

      {sessions.map((session) => (
        <div key={session.id} className="relative">
          {/* Timeline dot */}
          <span
            className={`absolute -left-[23px] top-[13px] h-2.5 w-2.5 rounded-full ${indicatorColor}`}
          />

          <SessionItem session={session} />
        </div>
      ))}
    </div>
  );
}
