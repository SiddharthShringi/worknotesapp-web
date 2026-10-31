import { DateNavigator } from "./DateNavigator";
import { DownloadButton } from "./DownloadButton";
import { GenerateTimesheetButton } from "./GenerateTimesheetButton";

export type DateNavigatorProps = {
  date: Date;
  setSelectedDate: (date: Date) => void;
};

export function ReportToolbar({ date, setSelectedDate }: DateNavigatorProps) {
  return (
    <section className="mt-4 rounded-xl border bg-card p-4 sm:p-5">
      {/* Toolbar Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold leading-6 sm:text-lg">
            Daily Report
          </h2>

          <p className="text-sm text-muted-foreground">
            Navigate dates and manage your reports.
          </p>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Date Navigation */}
        <DateNavigator date={date} setSelectedDate={setSelectedDate} />

        {/* Report Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <DownloadButton />
          <GenerateTimesheetButton />
        </div>
      </div>
    </section>
  );
}
