import type { DailyReport as DailyReportType } from "@/types/report.types";

import { ReportCollapsible } from "./ReportCollapsible";
import { ReportSummary } from "./ReportSummary";
import { ProjectList } from "./ProjectList";
import { CollapsedReportStats } from "./CollapsedReportStats";

interface DailyReportProps {
  report: DailyReportType;
}

export function DetailedSessionReport({ report }: DailyReportProps) {
  return (
    <ReportCollapsible
      collapsedSummary={<CollapsedReportStats report={report} />}
      expandedDescription="A breakdown of your work sessions, activities, and notes for the day."
    >
      <ReportSummary report={report} />
      <ProjectList projects={report.projects} />
    </ReportCollapsible>
  );
}
