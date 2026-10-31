"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, FileText } from "lucide-react";

interface ReportCollapsibleProps {
  children: ReactNode;
  collapsedSummary: ReactNode;
  expandedDescription: string;
}

export function ReportCollapsible({
  children,
  collapsedSummary,
  expandedDescription,
}: ReportCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-xl border bg-card overflow-hidden mt-3">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="h-4 w-4 shrink-0" />

              <div className="min-w-0">
                <h3 className="text-sm font-semibold">
                  Detailed Session Report
                </h3>

                <div className="mt-1 text-xs text-muted-foreground">
                  {isOpen ? expandedDescription : collapsedSummary}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
              <span>{isOpen ? "Hide Breakdown" : "View Breakdown"}</span>

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
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
