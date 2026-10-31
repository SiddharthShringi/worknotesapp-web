import { Clock, Zap, MonitorPlay } from "lucide-react";

import { DailyReport } from "@/types/report.types";
import { formatDuration, formatTime } from "@/lib/utils/dateFn";

interface ReportSummaryProps {
  report: DailyReport;
}

export function ReportSummary({ report }: ReportSummaryProps) {
  const metrics = [
    {
      label: "Total Focus Time",
      value: formatDuration(report.total_duration),
      icon: Clock,
    },
    {
      label: "Sessions",
      value: `${report.total_sessions} Sessions`,
      icon: Zap,
    },
    {
      label: "Started AT",
      value: report.first_session_start
        ? formatTime(report.first_session_start)
        : "—",
      icon: MonitorPlay,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-lg border p-3 flex items-center gap-3"
          >
            <div className="rounded-md bg-muted p-2">
              <Icon className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[12px] uppercase tracking-wider text-muted-foreground">
                {metric.label}
              </p>

              <p className="text-sm font-semibold mt-1">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
