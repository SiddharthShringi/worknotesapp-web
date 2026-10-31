import { format } from "date-fns";
import { CalendarX } from "lucide-react";

interface EmptyReportProps {
  date: Date;
}

export function EmptyReport({ date }: EmptyReportProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 mt-4 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <CalendarX className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="font-semibold text-base">No work sessions recorded</h3>

      <p className="text-sm text-muted-foreground mt-2">
        There are no recorded work sessions for {format(date, "MMMM d, yyyy")}.
      </p>

      <p className="text-xs text-muted-foreground mt-1">
        Your daily report will appear here once you start tracking your work.
      </p>
    </div>
  );
}
