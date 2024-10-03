import { Order } from "@/types";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { cva } from "class-variance-authority";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

export function BoardColumn({ column, orders }: BoardColumnProps) {
  const ordersIds = useMemo(() => {
    return orders.map((order) => order.id);
  }, [orders]);

  const { setNodeRef, attributes, listeners } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      className="flex min-h-[500px] w-[350px] max-w-full flex-1 snap-center flex-col border-none bg-slate-50/50"
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
        <span className="ml-auto"> {column.title}</span>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col gap-2 p-2">
        <SortableContext items={ordersIds}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </SortableContext>
      </CardContent>
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
