import { DateNavigator } from "./DateNavigator";
import { DownloadButton } from "./DownloadButton";
import { GenerateTimesheetButton } from "./GenerateTimesheetButton";

export type DateNavigatorProps = {
  date: Date;
  setSelectedDate: (date: Date) => void;
};

export function ReportToolbar({ date, setSelectedDate }: DateNavigatorProps) {
  return (
    <div className="mt-2 px-3 py-4 border rounded-xl">
      <h2 className="text-lg font-semibold my-1">Report Date</h2>
      <div className="flex items-center justify-between">
        <div>
          <DateNavigator date={date} setSelectedDate={setSelectedDate} />
        </div>
        <div className="flex items-center gap-3 justif">
          <DownloadButton />
          <GenerateTimesheetButton />
        </div>
      </div>
    </div>
  );
}
