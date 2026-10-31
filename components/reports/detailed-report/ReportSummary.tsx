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
      value: report.total_sessions.toString(),
      icon: Zap,
    },
    {
      label: "Started At",
      value: report.first_session_start
        ? formatTime(report.first_session_start)
        : "—",
      icon: MonitorPlay,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="flex items-center gap-3 rounded-xl border p-4 sm:p-5"
          >
            {/* Icon */}
            <div className="shrink-0 rounded-lg bg-muted p-2.5">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            {/* Metric details */}
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                {metric.label}
              </p>

              <p className="text-lg font-semibold leading-tight tabular-nums sm:text-xl">
                {metric.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
