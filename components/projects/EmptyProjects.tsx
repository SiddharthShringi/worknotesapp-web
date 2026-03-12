import { FolderXIcon, FrownIcon } from "lucide-react";

export function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center my-12 py-32 text-center border border-muted rounded-md bg-secondary">
      <FrownIcon className="h-10 w-10 text-muted-foreground" />

      <div className="mt-3 space-y-2">
        <p className="text-xl font-semibold">No Projects</p>
        <p className="text-base text-muted-foreground max-w-sm">
          Create your first project to organize your work and track sessions.
        </p>
      </div>
    </div>
  );
}
