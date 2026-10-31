"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/reports/PageHeader";
import { getReport } from "@/lib/api/report.api";
import { ReportToolbar } from "@/components/reports/ReportToolBar";
import { TimeByProjectCard } from "@/components/reports/TimeByProjectCard";
import { DetailedSessionReport } from "@/components/reports/detailed-report/DetailedSessionReport";

function ReportsPage() {
  const [date, setDate] = useState<Date>(new Date());

  const selectedDate = format(date, "yyyy-MM-dd");

  const {
    data: report,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["daily-report", selectedDate],
    queryFn: () => getReport({ date: selectedDate }),
  });

  console.log({ report });

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader />
      <ReportToolbar date={date} setSelectedDate={setDate} />

      {isLoading && <p>Loading report...</p>}

      {isError && !report && <p>Failed to load report. Please try again.</p>}

      {report && (
        <>
          <TimeByProjectCard report={report} />
          <DetailedSessionReport report={report} />
        </>
      )}
    </div>
  );
}

export default ReportsPage;
