import { Button } from "@/components/ui/button";
import { ProjectStatus } from "@/types/project.types";

type ProjectFilterTabsProps = {
  status: ProjectStatus;
  setStatus: (status: ProjectStatus) => void;
};

export default function ProjectFilterTabs({
  status,
  setStatus,
}: ProjectFilterTabsProps) {
  const filters: { label: string; value: ProjectStatus }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <div
      className="mt-4 flex w-full gap-2 sm:w-fit"
      role="group"
      aria-label="Filter projects by status"
    >
      {filters.map((filter) => {
        const isActive = status === filter.value;

        return (
          <Button
            key={filter.value}
            type="button"
            size="sm"
            variant={isActive ? "brand" : "outline"}
            aria-pressed={isActive}
            onClick={() => setStatus(filter.value)}
            className="h-9 min-w-0 flex-1 px-3 text-sm font-medium sm:flex-none sm:px-4"
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
