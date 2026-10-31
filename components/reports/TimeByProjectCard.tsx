import { DailyReport } from "@/types/report.types";
import { formatDate, formatDuration } from "@/lib/utils/dateFn";
import { ProjectStackedBar } from "./ProjectStackedBar";
import { ProjectReportTable, ProjectReportRow } from "./ProjectReportTable";

type TimeByProjectCardProps = {
  report: DailyReport;
};

function getPercentageShare(duration: number, totalDuration: number): number {
  if (totalDuration === 0) return 0;
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

  console.log({
    total_duration: report.total_duration,
    sessions_duration: report.projects.map((p) => p.duration),
  });
  return (
    <div className="px-3 border rounded-xl mt-4 bg-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold my-1">Time By Project</h2>
          <p className="text-base font-semibold text-muted-foreground whitespace-nowrap">
            {formatDate(date)}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold my-1">Total Duration</p>
          <p className="text-base font-bold text-muted-foreground whitespace-nowrap">
            {formatDuration(total_duration)}
          </p>
        </div>
      </div>

      <ProjectStackedBar projects={projects} totalDuration={total_duration} />
      <ProjectReportTable rows={rows} />
    </div>
  );
}
