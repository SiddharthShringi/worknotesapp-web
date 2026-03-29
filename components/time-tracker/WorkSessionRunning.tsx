import { Timer } from "./Timer";
import { WorkSession } from "@/types/workSession.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { stopWorkSession } from "@/lib/api/workSession.api";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { StopCircleIcon } from "lucide-react";
import { toast } from "sonner";

type WorkSessionRunningProps = {
  workSession: WorkSession;
  setLocalWorkSession: React.Dispatch<React.SetStateAction<WorkSession | null>>;
};

export function WorkSessionRunning({
  workSession,
  setLocalWorkSession,
}: WorkSessionRunningProps) {
  const { intent, started_at } = workSession;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: stopWorkSession,
    onSuccess: (data) => {
      toast.success("Work Session stopped successfully");
      setLocalWorkSession(data);
    },
    onError: (err) => {
      toast.error("Failed to stop Work Session. Please try again.");
    },
  });

  const handleStopSession = () => {
    mutation.mutate(workSession.id);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col items-center gap-2">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full animate-pulse bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.4)]"></span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Live Session
          </span>
        </div>

        {/* Timer */}
        <Timer startedAt={started_at} />

        {/* Intent */}
        <p className="text-center text-lg sm:text-xl text-muted-foreground max-w-xl">
          {intent}
        </p>

        {/* Stop Button (centered + larger) */}
        <Button
          variant="destructive"
          size="lg"
          onClick={handleStopSession}
          disabled={mutation.isPending}
          className="mt-2 flex items-center gap-2 px-8 py-6 text-base"
        >
          <StopCircleIcon className="size-5" />
          Stop Session
        </Button>
      </CardContent>
    </Card>
  );
}
