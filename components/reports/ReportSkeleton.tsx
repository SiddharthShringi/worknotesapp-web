import { Skeleton } from "@/components/ui/skeleton";

export function ReportSkeleton() {
  return (
    <div className="mt-4 space-y-4 animate-pulse">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border p-4 flex gap-3">
            <Skeleton className="h-9 w-9 rounded-md" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed report header */}
      <div className="rounded-xl border p-4 space-y-5">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Project sections */}
        {[1, 2].map((project) => (
          <div key={project} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Sessions */}
            {[1, 2, 3].map((session) => (
              <div key={session} className="rounded-md border p-3 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-5 w-12" />
                </div>

                <Skeleton className="h-7 w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
