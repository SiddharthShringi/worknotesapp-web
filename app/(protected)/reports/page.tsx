"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { ReportHeader } from "@/components/reports/ReportHeader";
import { DateNavigator } from "@/components/reports/ReportToolbar/DateNavigator";
import { getReport } from "@/lib/api/report.api";

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

  return (
    <div className="mx-auto max-w-7xl">
      <ReportHeader />

      <DateNavigator date={date} setSelectedDate={setDate} />

      {isLoading && <p>Loading report...</p>}

      {isError && !report && <p>Failed to load report. Please try again.</p>}

      {report && (
        <>
          <h1 className="text-3xl my-2">{report.date}</h1>
          <p>{report.total_duration}</p>
        </>
      )}
    </div>
  );
}

export default ReportsPage;
