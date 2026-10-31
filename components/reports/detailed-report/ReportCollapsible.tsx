"use client";

import { ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, FileText } from "lucide-react";

interface ReportCollapsibleProps {
  children: ReactNode;
}

export function ReportCollapsible({ children }: ReportCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-xl border bg-card overflow-hidden mt-3">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/30">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4" />

              <div>
                <h3 className="text-sm font-semibold">
                  Detailed Session Report
                </h3>
                <p className="text-xs text-muted-foreground">
                  Granular log of activities, work notes, and timestamps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {isOpen ? "Hide Breakdown" : "Show Breakdown"}

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="border-t p-4 space-y-5">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
