"use client";

import { format, addDays, parseISO } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type DateNavigatorProps = {
  date: Date;
  setSelectedDate: (date: Date) => void;
};

export function DateNavigator({ date, setSelectedDate }: DateNavigatorProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous day"
        onClick={() => setSelectedDate(addDays(date, -1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[194px] justify-between font-normal"
          >
            {format(date, "yyyy-MM-dd")}
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="icon"
        aria-label="Next day"
        onClick={() => setSelectedDate(addDays(date, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
