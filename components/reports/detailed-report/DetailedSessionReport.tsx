import type { DailyReport as DailyReportType } from "@/types/report.types";
import { ReportCollapsible } from "./ReportCollapsible";
import { ReportSummary } from "./ReportSummary";
import { ProjectList } from "./ProjectList";

interface DailyReportProps {
  report: DailyReportType;
}

export function DetailedSessionReport({ report }: DailyReportProps) {
  return (
    <ReportCollapsible>
      <ReportSummary report={report} />
      <ProjectList projects={report.projects} />
    </ReportCollapsible>
  );
}
