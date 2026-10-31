import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";

export function DownloadButton() {
  return (
    <Button
      variant="brand"
      disabled
      onClick={() => {
        console.log("Download");
      }}
    >
      <ArrowDownToLine className="h-4 w-4" />
      <p>Download</p>
    </Button>
  );
}
