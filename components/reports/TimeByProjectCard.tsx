import { Clock } from "lucide-react";

import { DailyReport } from "@/types/report.types";
import { formatDate, formatDuration } from "@/lib/utils/dateFn";
import { ProjectStackedBar } from "./ProjectStackedBar";
import { ProjectReportTable, ProjectReportRow } from "./ProjectReportTable";

type TimeByProjectCardProps = {
  report: DailyReport;
};

function getPercentageShare(duration: number, totalDuration: number): number {
  if (totalDuration <= 0) return 0;
  return (duration / totalDuration) * 100;
}

function toProjectReportRows(report: DailyReport): ProjectReportRow[] {
  const { projects, total_duration } = report;

  return projects.map(({ id, name, color, sessions, duration }) => ({
    id,
    name,
    color,
    sessionCount: sessions.length,
    duration,
    percentageShare: getPercentageShare(duration, total_duration),
  }));
}

export function TimeByProjectCard({ report }: TimeByProjectCardProps) {
  const { date, total_duration, projects } = report;
  const rows = toProjectReportRows(report);

  return (
    <section className="mt-4 rounded-xl border bg-card p-4 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Report Date */}
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Daily Overview
          </p>

          <h2 className="text-base font-semibold leading-6 sm:text-lg">
            {formatDate(date)}
          </h2>
        </div>

        {/* Total Focus Time */}
        <div className="flex items-center gap-3">
          <div className="hidden rounded-lg bg-muted p-2.5 text-muted-foreground sm:block">
            <Clock className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="space-y-1 sm:text-right">
            <p className="text-sm font-medium text-muted-foreground">
              Total Focus Time
            </p>

            <p className="text-xl font-bold leading-tight tabular-nums sm:text-2xl">
              {formatDuration(total_duration)}
            </p>
          </div>
        </div>
      </div>

      {/* Project Time Distribution */}
      <ProjectStackedBar projects={projects} totalDuration={total_duration} />

      {/* Project Breakdown */}
      <ProjectReportTable rows={rows} />
    </section>
  );
}
