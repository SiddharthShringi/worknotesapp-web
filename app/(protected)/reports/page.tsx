"use client";

import { useState } from "react";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { DateNavigator } from "@/components/reports/ReportToolbar/DateNavigator";

function ReportsPage() {
  const [date, setDate] = useState(new Date());

  console.log("Selected date:", date);

  return (
    <div className="mx-auto max-w-7xl">
      <ReportHeader />
      <DateNavigator value={date} onChange={setDate} />
      {/* <StackedBarChart />
      <ProjectTable />
      <DetailedProjectTable /> */}
    </div>
  );
}

export default ReportsPage;
