import { Order } from "@/types";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import * as React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { translateStatus } from "../OrderSheetDetails";
import OrderItem from "./OrderItem";

type OrderListProps = {
  listTitle?: string;
  listId?: string;
  listType?: string;
  listOfOrders: Order[];
  isDropDisabled?: boolean;
  setOpenDetailsOrder: (value: boolean) => void;
  setSelectedOrder: (value: Order | null) => void;
};

export default function OrderList({
  listTitle,
  listOfOrders,
  isDropDisabled,
  listId = "LIST",
  listType,
  setOpenDetailsOrder,
  setSelectedOrder,
}: OrderListProps) {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      isDropDisabled={isDropDisabled}
    >
      {(dropProvided: DroppableProvided) => (
        <Card
          {...dropProvided.droppableProps}
          className="min-h-[500px] flex-1 border-none bg-slate-50"
        >
          <CardHeader className="space-between flex flex-row items-center p-4 text-left font-semibold">
            <span className="ml-auto text-xs font-thin uppercase text-slate-400">
              {" "}
              {translateStatus[listTitle as keyof typeof translateStatus]}
            </span>
          </CardHeader>
          <CardContent>
            <InnerList
              listOfOrders={listOfOrders}
              dropProvided={dropProvided}
              title={listTitle}
              setOpenDetailsOrder={setOpenDetailsOrder}
              setSelectedOrder={setSelectedOrder}
            />
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
}

type InnerListProps = {
  dropProvided: DroppableProvided;
  listOfOrders: Order[];
  title?: string;
  setOpenDetailsOrder: (value: boolean) => void;
  setSelectedOrder: (value: Order | null) => void;
};

function InnerList({
  listOfOrders,
  dropProvided,
  setOpenDetailsOrder,
  setSelectedOrder,
}: InnerListProps) {
  return (
    <div ref={dropProvided.innerRef} className="grid grid-cols-1 gap-3">
      {listOfOrders.map((order, index) => {
        return (
          <Draggable key={order.id} draggableId={order.id} index={index}>
            {(
              dragProvided: DraggableProvided,
              dragSnapshot: DraggableStateSnapshot,
            ) => (
              <OrderItem
                setOpenDetailsOrder={setOpenDetailsOrder}
                setSelectedOrder={setSelectedOrder}
                key={order.id}
                order={order}
                provided={dragProvided}
                isDragging={dragSnapshot.isDragging}
              />
            )}
          </Draggable>
        );
      })}
      {dropProvided.placeholder}
    </div>
  );
}
