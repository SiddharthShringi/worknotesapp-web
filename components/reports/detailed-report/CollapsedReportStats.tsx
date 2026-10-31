import type { DailyReport } from "@/types/report.types";
import { formatDuration } from "@/lib/utils/dateFn";

interface CollapsedReportStatsProps {
  report: DailyReport;
}

export function CollapsedReportStats({ report }: CollapsedReportStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span>
        <strong className="text-foreground font-medium">
          {formatDuration(report.total_duration)}
        </strong>{" "}
        focused
      </span>

      <span className="text-muted-foreground/50">·</span>

      <span>
        <strong className="text-foreground font-medium">
          {report.total_sessions}
        </strong>{" "}
        sessions
      </span>

      <span className="text-muted-foreground/50">·</span>

      <span>
        <strong className="text-foreground font-medium">
          {report.projects.length}
        </strong>{" "}
        projects
      </span>
    </div>
  );
}
