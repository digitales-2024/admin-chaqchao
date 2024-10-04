import { useModeViewOrder } from "@/hooks/use-mode-view-order";
import { useStore } from "@/hooks/use-store";
import { motion } from "framer-motion";
import {
  BetweenVerticalStart,
  LucideProps,
  TableProperties,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ViewData {
  id: "table" | "kanban";
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  tooltip: string;
}

const viewData: ViewData[] = [
  {
    id: "table",
    icon: TableProperties,
    tooltip: "Ver pedidos en formato de tabla",
  },
  {
    id: "kanban",
    icon: BetweenVerticalStart,
    tooltip: "Ver pedidos en formato de kanban",
  },
];

export const SwitchModeView = () => {
  const modeView = useStore(useModeViewOrder, (state) => state);

  if (!modeView) null;
  return (
    <div className="flex justify-end">
      <div className="flex w-fit space-x-1 rounded-xl bg-secondary p-1">
        {viewData.map(({ id, icon: Icon, tooltip }) => (
          <Button
            key={id}
            variant="ghost"
            className={`${
              modeView?.modeViewOrder === id
                ? "text-slate-500"
                : "text-muted-foreground hover:text-primary"
            } relative z-10 flex items-center justify-center rounded-lg px-[10px] text-sm font-medium transition focus-visible:outline-2`}
            onClick={() => modeView?.setModeViewOrder(id)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icon className="size-5" strokeWidth={1.5} />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {modeView?.modeViewOrder === id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 -z-10 bg-white"
                style={{ borderRadius: 8 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
