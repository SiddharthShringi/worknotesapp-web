import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

type Props = {
  archived: boolean;
  onEdit: () => void;
  onToggleArchive: () => void;
};

export const ActionMenu = ({ archived, onEdit, onToggleArchive }: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>

          <DropdownMenuItem onClick={onToggleArchive}>
            {archived ? (
              <span className="text-green-700 dark:text-green-300">
                Activate
              </span>
            ) : (
              <span className="text-destructive">Archive</span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
