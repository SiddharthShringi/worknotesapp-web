"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import DeleteProjectAlert from "./DeleteProjectAlert";

type Props = {
  archived: boolean;
  onEdit: () => void;
  onToggleArchive: () => void;
  onDelete: () => void;
};

export const ActionMenu = ({
  archived,
  onEdit,
  onToggleArchive,
  onDelete,
}: Props) => {
  return (
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
            <span className="text-green-700 dark:text-green-300">Activate</span>
          ) : (
            <span>Archive</span>
          )}
        </DropdownMenuItem>
        <DeleteProjectAlert onDelete={onDelete} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
