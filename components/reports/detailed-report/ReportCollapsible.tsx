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
      <div className="mt-4 overflow-hidden rounded-xl border bg-card">
        {/* Collapsible Header */}
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/30 sm:p-5"
          >
            {/* Header Content */}
            <div className="flex min-w-0 items-start gap-3">
              {/* Icon */}
              <div className="mt-0.5 shrink-0 rounded-lg bg-muted p-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Title and Description */}
              <div className="min-w-0 space-y-1.5">
                <h3 className="text-base font-semibold leading-6 sm:text-lg">
                  Detailed Report
                </h3>

                <div className="text-sm leading-5 text-muted-foreground">
                  {isOpen ? expandedDescription : collapsedSummary}
                </div>
              </div>
            </div>

            {/* Toggle Action */}
            <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground">
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
        </CollapsibleTrigger>
        {/* Expanded Content */}
        <CollapsibleContent className="overflow-hidden border-t data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="p-4 sm:p-5 lg:p-6">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
