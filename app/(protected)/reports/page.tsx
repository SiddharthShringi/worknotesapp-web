"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/reports/PageHeader";
import { getReport } from "@/lib/api/report.api";
import { ReportToolbar } from "@/components/reports/ReportToolBar";
import { TimeByProjectCard } from "@/components/reports/TimeByProjectCard";
import { DetailedSessionReport } from "@/components/reports/detailed-report/DetailedSessionReport";
import { EmptyReport } from "@/components/reports/EmptyReport";
import { ReportSkeleton } from "@/components/reports/ReportSkeleton";

function ReportsPage() {
  const [date, setDate] = useState<Date>(new Date());

  const selectedDate = format(date, "yyyy-MM-dd");

  const {
    data: report,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["daily-report", selectedDate],
    queryFn: () => getReport({ date: selectedDate }),
  });

  const hasReport = report && report.total_sessions > 0;

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader />

      <ReportToolbar date={date} setSelectedDate={setDate} />

      {isLoading && <ReportSkeleton />}

      {isError && (
        <p className="text-sm text-destructive mt-4">
          Failed to load report. Please try again.
        </p>
      )}

      {isSuccess && hasReport && (
        <>
          <TimeByProjectCard report={report} />
          <DetailedSessionReport report={report} />
        </>
      )}

      {isSuccess && !hasReport && <EmptyReport date={date} />}
    </div>
  );
}

export default ReportsPage;
