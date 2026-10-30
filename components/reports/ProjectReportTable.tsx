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
    <div className="my-5 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="px-2 font-bold text-foreground">
              Project
            </TableHead>
            <TableHead className="px-2 font-bold text-foreground">
              Sessions
            </TableHead>
            <TableHead className="px-2 font-bold text-foreground">
              Duration
            </TableHead>
            <TableHead className="px-2 text-right font-bold text-foreground">
              Share
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="px-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 shrink-0 rounded-full border border-border ${
                      PROJECT_COLOR_MAP[row.color].bg
                    }`}
                  />
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="px-2">{row.sessionCount}</TableCell>
              <TableCell className="px-2">
                {formatDuration(row.duration)}
              </TableCell>
              <TableCell className="px-2 text-right">
                {row.percentageShare.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
