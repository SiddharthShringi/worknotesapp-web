import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function GenerateTimesheetButton() {
  return (
    <Button
      variant="brand"
      disabled
      onClick={() => {
        console.log("Download");
      }}
    >
      <FileText className="h-4 w-4" />
      <p>Download</p>
    </Button>
  );
}
