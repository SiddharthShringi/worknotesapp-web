import { Button } from "@/components/ui/button";
import { ProjectStatus } from "@/types/project.types";

export default function ProjectFilterTabs({
  status,
  setStatus,
}: {
  status: ProjectStatus;
  setStatus: (status: ProjectStatus) => void;
}) {
  return (
    <div className="flex gap-2 mt-4">
      <Button
        className="cursor-pointer"
        variant={status === "all" ? "brand" : "outline"}
        onClick={() => setStatus("all")}
      >
        All
      </Button>
      <Button
        className="cursor-pointer"
        variant={status === "active" ? "brand" : "outline"}
        onClick={() => setStatus("active")}
      >
        Active
      </Button>
      <Button
        className="cursor-pointer"
        variant={status === "archived" ? "brand" : "outline"}
        onClick={() => setStatus("archived")}
      >
        Archived
      </Button>
    </div>
  );
}
