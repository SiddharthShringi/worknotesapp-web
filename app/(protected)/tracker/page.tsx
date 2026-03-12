import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function TimeTrackerPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-6">
      {/* Page Header */}
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Time Tracker</h1>

        <p className="text-muted-foreground max-w-xl">
          Track focused work sessions across your projects. Measure consistency,
          review progress, and stay accountable to the work that matters.
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card className="border-dashed">
        <CardHeader className="flex flex-row items-center gap-3">
          <Clock className="h-6 w-6 text-muted-foreground" />

          <div className="space-y-1">
            <CardTitle>Session Tracker</CardTitle>

            <CardDescription>
              Log deep work sessions, track productivity patterns, and see how
              your effort compounds over time.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            This feature is currently under development.
          </p>

          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </main>
  );
}

export default TimeTrackerPage;
