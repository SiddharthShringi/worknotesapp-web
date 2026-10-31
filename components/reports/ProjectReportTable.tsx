import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PROJECT_COLOR_MAP } from "@/lib/constants/project-colors";
import { formatDuration } from "@/lib/utils/dateFn";
import { ProjectColor } from "@/types/project.types";

export type ProjectReportRow = {
  id: number;
  name: string;
  color: ProjectColor;
  sessionCount: number;
  duration: number;
  percentageShare: number;
};

type ProjectReportTableProps = {
  rows: ProjectReportRow[];
};

export function ProjectReportTable({ rows }: ProjectReportTableProps) {
  return (
    <div className="my-5 w-full overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="h-12 px-3 text-sm font-semibold text-foreground sm:px-4">
              Project
            </TableHead>

            <TableHead className="h-12 px-3 text-right text-sm font-semibold text-foreground sm:px-4">
              Sessions
            </TableHead>

            <TableHead className="h-12 px-3 text-right text-sm font-semibold text-foreground sm:px-4">
              Duration
            </TableHead>

            <TableHead className="h-12 px-3 text-right text-sm font-semibold text-foreground sm:px-4">
              Share
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="transition-colors hover:bg-muted/30"
            >
              {/* Project */}
              <TableCell className="px-3 py-4 sm:px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full ${
                      PROJECT_COLOR_MAP[row.color].bg
                    }`}
                  />

                  <span className="break-words text-sm font-medium leading-5 text-foreground sm:text-base">
                    {row.name}
                  </span>
                </div>
              </TableCell>

              {/* Sessions */}
              <TableCell className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium leading-5 tabular-nums text-foreground sm:px-4 sm:text-base">
                {row.sessionCount}
              </TableCell>

              {/* Duration */}
              <TableCell className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium leading-5 tabular-nums text-foreground sm:px-4 sm:text-base">
                {formatDuration(row.duration)}
              </TableCell>

              {/* Percentage Share */}
              <TableCell className="whitespace-nowrap px-3 py-4 text-right text-sm leading-5 tabular-nums text-muted-foreground sm:px-4 sm:text-base">
                {row.percentageShare.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
