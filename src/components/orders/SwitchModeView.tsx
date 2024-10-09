import { useViewModeStore } from "@/hooks/use-mode-view-order";
import { Columns3, TableProperties } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SwitchModeView: React.FC = () => {
  const { viewMode, toggleViewMode } = useViewModeStore();

  return (
    <div className="flex gap-1 text-slate-500">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={viewMode === "table" ? "outline" : "ghost"}
            onClick={() => viewMode !== "table" && toggleViewMode()}
            className={cn({
              "hover:bg-white": viewMode === "table",
            })}
          >
            <TableProperties strokeWidth={1.5} className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cambiar a vista Tabla</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={viewMode === "kanban" ? "outline" : "ghost"}
            onClick={() => viewMode !== "kanban" && toggleViewMode()}
            className={cn({
              "hover:bg-white": viewMode === "kanban",
            })}
          >
            <Columns3 strokeWidth={1.5} className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cambiar a vista Kanban</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SwitchModeView;
