"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  startedAt: string | Date;
};

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

export function Timer({ startedAt }: Props) {
  const [now, setNow] = useState(Date.now());

  // Normalize startedAt → timestamp
  const startTime =
    startedAt instanceof Date
      ? startedAt.getTime()
      : new Date(startedAt).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const elapsed = now - startTime;

  const totalSeconds = Math.floor(elapsed / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-6 p-4">
      <TimeSegment value={format(hours)} label="Hours" />
      <Separator />
      <TimeSegment value={format(minutes)} label="Minutes" />
      <Separator />
      <TimeSegment value={format(seconds)} label="Seconds" />
    </div>
  );
}

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
    <span className="text-3xl font-light text-muted-foreground pb-2 animate-pulse">
      :
    </span>
  );
}
