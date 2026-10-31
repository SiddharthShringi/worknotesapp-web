import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface GenerateTimesheetButtonProps {
  onGenerate?: () => void;
  disabled?: boolean;
}

export function GenerateTimesheetButton({
  onGenerate,
  disabled = false,
}: GenerateTimesheetButtonProps) {
  return (
    <Button
      variant="outline"
      size="default"
      disabled={disabled}
      onClick={onGenerate}
      className="gap-2 text-sm font-medium"
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      <span>Generate Timesheet</span>
    </Button>
  );
}
