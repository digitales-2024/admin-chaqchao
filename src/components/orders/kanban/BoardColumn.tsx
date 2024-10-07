import { Order } from "@/types";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { OrderSheetDetails } from "../OrderSheetDetails";
import { OrderCard } from "./OrderCard";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  orders: Order[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, orders, isOverlay }: BoardColumnProps) {
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const ordersIds = useMemo(() => {
    return orders.map((order) => order.id);
  }, [orders]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-full min-h-[500px] flex-1 bg-slate-50 border-none flex flex-col",
    {
      variants: {
        dragging: {
          default: "border border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="space-between flex flex-row items-center p-4 text-left font-semibold">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="relative -ml-2 h-auto cursor-grab p-1 text-primary/50"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
        </Button>
        <span className="ml-auto text-xs font-thin text-slate-400">
          {" "}
          {column.title}
        </span>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-2 p-2">
        <SortableContext items={ordersIds}>
          {orders.map((order) => (
            <OrderCard
              setSelectedOrder={setSelectedOrder}
              setOpenDetailsOrder={setOpenDetailsOrder}
              key={order.id}
              order={order}
            />
          ))}
        </SortableContext>
      </CardContent>
      <OrderSheetDetails
        order={selectedOrder}
        open={openDetailsOrder}
        onOpenChange={() => setOpenDetailsOrder(false)}
      />
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex flex-1 flex-row gap-4">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
