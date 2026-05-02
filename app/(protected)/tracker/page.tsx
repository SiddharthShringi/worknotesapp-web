import { WorkSessionContainer } from "@/components/time-tracker/WorkSessionContainer";
import { WorkSessionList } from "@/components/time-tracker/WorkSessionList";

function TimeTrackerPage() {
  return (
    <div>
      <WorkSessionContainer />
      <div className="mt-8">
        <WorkSessionList />
      </div>
    </div>
  );
}

export default TimeTrackerPage;
