"use client";

import { useQuery } from "@tanstack/react-query";

import { GroupedWorkSessions } from "@/types/workSession.types";
import { getWorkSessions } from "@/lib/api/workSession.api";
import { getLabel, formatDuration } from "@/lib/utils/dateFn";

import DateLabel from "../work-sessions/DateLabel";
import WorkSession from "../work-sessions/WorkSession";
import { Skeleton } from "../ui/skeleton";

function WorkSessionListSkeleton() {
  return (
    <div className="space-y-8" aria-label="Loading work sessions">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-5">
          {/* Date label skeleton */}
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Session skeletons */}
          <div className="space-y-5">
            {Array.from({ length: 2 }).map((_, sessionIndex) => (
              <div key={sessionIndex} className="flex gap-3">
                <Skeleton className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-5 w-48 max-w-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </div>

                  <Skeleton className="h-4 w-3/4 max-w-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkSessionList() {
  const { data: groupedSessions = [], isLoading: loadingWorkSessions } =
    useQuery<GroupedWorkSessions[]>({
      queryKey: ["workSessions"],
      queryFn: getWorkSessions,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  if (loadingWorkSessions) {
    return <WorkSessionListSkeleton />;
  }

  if (groupedSessions.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed px-4 py-10 text-center sm:py-12">
        <p className="text-sm font-medium text-foreground">
          No work sessions yet
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Your completed work sessions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {groupedSessions.map((group) => (
        <section key={group.date} className="space-y-5">
          <DateLabel
            label={getLabel(group.date)}
            duration={formatDuration(Number(group.total_duration) || 0)}
          />

          <div className="space-y-4">
            {group.sessions.map((session) => (
              <WorkSession key={session.id} session={session} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
