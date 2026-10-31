import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";

interface DownloadButtonProps {
  onDownload?: () => void;
  disabled?: boolean;
}

export function DownloadButton({
  onDownload,
  disabled = false,
}: DownloadButtonProps) {
  return (
    <Button
      variant="outline"
      size="default"
      disabled={disabled}
      onClick={onDownload}
      className="gap-2 text-sm font-medium"
    >
      <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
      <span>Download Report</span>
    </Button>
  );
}
