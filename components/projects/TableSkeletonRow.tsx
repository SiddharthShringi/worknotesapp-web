import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export function TableSkeletonRow() {
  return (
    <TableRow>
      <TableCell className="px-2 py-4">
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell className="px-2 py-4">
        <Skeleton className="h-4 w-64" />
      </TableCell>
      <TableCell className="px-2 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>
      <TableCell className="px-2 py-4 flex justify-end">
        <Skeleton className="h-8 w-8 rounded-md" />
      </TableCell>
    </TableRow>
  );
}
