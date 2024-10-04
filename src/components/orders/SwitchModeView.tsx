import { useModeViewOrder } from "@/hooks/use-mode-view-order";
import { useStore } from "@/hooks/use-store";
import { BetweenVerticalStart, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type ViewType = "table" | "kanban";

export const SwitchModeView = () => {
  const mode = useStore(useModeViewOrder, (state) => state);

  const [activeView, setActiveView] = useState<ViewType>(
    mode?.modeViewOrder || "table",
  );

  useEffect(() => {
    mode?.setModeViewOrder(activeView);
  }, [activeView]);

  return (
    <div className="flex justify-end">
      <div className="flex h-fit w-fit space-x-1 rounded-md p-1">
        <Button
          size="icon"
          variant="outline"
          className={`${
            activeView === "table" ? "bg-white hover:bg-white" : "bg-accent"
          } relative flex items-center justify-center text-sm font-medium transition focus-visible:outline-2`}
          onClick={() => setActiveView && setActiveView("table")}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <TableProperties size={20} />
            </TooltipTrigger>
            <TooltipContent>Modo tabla</TooltipContent>
          </Tooltip>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className={`${
            activeView === "kanban" ? "bg-white hover:bg-white" : "bg-accent"
          } relative flex items-center justify-center text-sm font-medium transition focus-visible:outline-2`}
          onClick={() => setActiveView && setActiveView("kanban")}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <BetweenVerticalStart size={20} />
            </TooltipTrigger>
            <TooltipContent>Modo tabla</TooltipContent>
          </Tooltip>
        </Button>
      </div>
    </div>
  );
};
