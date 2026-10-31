import type { DailyReport } from "@/types/report.types";
import { formatDuration } from "@/lib/utils/dateFn";

interface CollapsedReportStatsProps {
  report: DailyReport;
}

export function CollapsedReportStats({ report }: CollapsedReportStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm leading-5">
      {/* Focus Duration */}
      <span className="whitespace-nowrap">
        <strong className="font-semibold text-foreground tabular-nums">
          {formatDuration(report.total_duration)}
        </strong>{" "}
        <span className="text-muted-foreground">focused</span>
      </span>

      <span className="text-muted-foreground/50" aria-hidden="true">
        ·
      </span>

      {/* Sessions */}
      <span className="whitespace-nowrap">
        <strong className="font-semibold text-foreground tabular-nums">
          {report.total_sessions}
        </strong>{" "}
        <span className="text-muted-foreground">sessions</span>
      </span>

      <span className="text-muted-foreground/50" aria-hidden="true">
        ·
      </span>

      {/* Projects */}
      <span className="whitespace-nowrap">
        <strong className="font-semibold text-foreground tabular-nums">
          {report.projects.length}
        </strong>{" "}
        <span className="text-muted-foreground">projects</span>
      </span>
    </div>
  );
}
