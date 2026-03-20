"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type TimerStatus = "running" | "paused" | "stopped";

interface TimerProps {
  startedAt: string | Date;
  onPause?: (elapsedSeconds: number) => void;
  onResume?: (elapsedSeconds: number) => void;
  onStop?: (elapsedSeconds: number) => void;
}

function formatTime(totalSeconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
} {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

export function Timer({ startedAt, onPause, onResume, onStop }: TimerProps) {
  const startDate = useRef(
    startedAt instanceof Date ? startedAt : new Date(startedAt),
  );

  // Accumulated seconds from previous running segments (before pauses)
  const accumulatedRef = useRef(0);
  // Timestamp when the current running segment began
  const segmentStartRef = useRef<Date>(startDate.current);

  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<TimerStatus>("running");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const computeElapsed = useCallback(() => {
    const now = new Date();
    const segmentSeconds = Math.floor(
      (now.getTime() - segmentStartRef.current.getTime()) / 1000,
    );
    return accumulatedRef.current + segmentSeconds;
  }, []);

  // Start / restart the interval
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setElapsed(computeElapsed());
    }, 1000);
    // Immediately sync
    setElapsed(computeElapsed());
  }, [computeElapsed]);

  // Mount — kick off the timer
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handlePause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const current = computeElapsed();
    accumulatedRef.current = current;
    setElapsed(current);
    setStatus("paused");
    onPause?.(current);
  };

  const handleResume = () => {
    segmentStartRef.current = new Date();
    setStatus("running");
    startInterval();
    onResume?.(accumulatedRef.current);
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const final =
      status === "running" ? computeElapsed() : accumulatedRef.current;
    setElapsed(final);
    setStatus("stopped");
    onStop?.(final);
  };

  const { hours, minutes, seconds } = formatTime(elapsed);
  const isRunning = status === "running";
  const isStopped = status === "stopped";

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card via-card to-accent/30 shadow-lg">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-xl border border-border/50" />

      <CardContent className="relative flex flex-col items-center gap-6 py-8">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isRunning
                ? "animate-pulse bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.4)]"
                : isStopped
                  ? "bg-destructive shadow-[0_0_8px_2px_rgba(239,68,68,0.3)]"
                  : "bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.3)]"
            }`}
          />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {status}
          </span>
        </div>

        {/* Time display circular ring */}
        <div className="relative mt-4 flex size-72 items-center justify-center rounded-full sm:size-80">
          <svg
            className="absolute inset-0 size-full -rotate-90 transform"
            viewBox="0 0 320 320"
          >
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              className="stroke-muted/30"
              strokeWidth="8"
            />
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              className={`transition-all duration-1000 ease-linear ${
                isRunning
                  ? "stroke-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  : "stroke-muted"
              }`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 140}
              strokeDashoffset={
                2 * Math.PI * 140 * (1 - (elapsed % 60) / 60)
              }
            />
          </svg>

          {/* Time text */}
          <div className="flex items-baseline gap-1 font-mono tabular-nums">
            <TimeSegment value={hours} label="h" />
            <Separator />
            <TimeSegment value={minutes} label="m" />
            <Separator />
            <TimeSegment value={seconds} label="s" />
          </div>
        </div>

        {/* Controls */}
        {!isStopped && (
          <div className="flex items-center gap-3">
            {isRunning ? (
              <Button
                variant="outline"
                size="lg"
                onClick={handlePause}
                className="gap-2 rounded-full px-6 transition-all hover:scale-105 hover:shadow-md"
              >
                <Pause className="size-4" />
                Pause
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={handleResume}
                className="gap-2 rounded-full px-6 transition-all hover:scale-105 hover:shadow-md"
              >
                <Play className="size-4" />
                Resume
              </Button>
            )}

            <Button
              variant="destructive"
              size="lg"
              onClick={handleStop}
              className="gap-2 rounded-full px-6 transition-all hover:scale-105 hover:shadow-md"
            >
              <Square className="size-4" />
              Stop
            </Button>
          </div>
        )}

        {isStopped && (
          <p className="text-sm text-muted-foreground">Session ended</p>
        )}
      </CardContent>
    </Card>
  );
}

/* ——— Sub-components ——— */

function TimeSegment({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl font-bold tracking-tight text-foreground">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="mb-4 text-3xl font-light text-muted-foreground/50">
      :
    </span>
  );
}
