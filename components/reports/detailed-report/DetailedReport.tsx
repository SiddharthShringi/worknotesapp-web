import type { DailyReport as DailyReportType } from "@/types/report.types";

import { ReportCollapsible } from "./ReportCollapsible";
import { ReportSummary } from "./ReportSummary";
import { ProjectList } from "./ProjectList";
import { CollapsedReportStats } from "./CollapsedReportStats";

interface DailyReportProps {
  report: DailyReportType;
}

export function DetailedReport({ report }: DailyReportProps) {
  return (
    <ReportCollapsible
      collapsedSummary={<CollapsedReportStats report={report} />}
      expandedDescription="A breakdown of your work sessions, activities, and notes for the day."
    >
      <div className="space-y-6">
        {/* Daily Metrics */}
        <ReportSummary report={report} />

        {/* Project Breakdown */}
        <ProjectList projects={report.projects} />
      </div>
    </ReportCollapsible>
  );
}
