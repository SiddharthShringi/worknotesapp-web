"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateNavigatorProps = {
  date: Date;
  setSelectedDate: (date: Date) => void;
};

export function DateNavigator({ date, setSelectedDate }: DateNavigatorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
      {/* Previous Day */}
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0"
        aria-label="Previous day"
        onClick={() => setSelectedDate(addDays(date, -1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Date Picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 min-w-0 flex-1 justify-between gap-2 px-3 text-sm font-medium tabular-nums sm:w-[220px] sm:flex-none"
          >
            <span className="truncate">{format(date, "EEE, MMM d, yyyy")}</span>

            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setSelectedDate(selectedDate);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Next Day */}
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0"
        aria-label="Next day"
        onClick={() => setSelectedDate(addDays(date, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
