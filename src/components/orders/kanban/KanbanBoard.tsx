import { Order, OrderStatus } from "@/types";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { BoardColumn, BoardContainer } from "./BoardColumn";
import type { Column } from "./BoardColumn";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { OrderCard } from "./OrderCard";
import { hasDraggableData } from "./utils";

const defaultCols = [
  {
    id: OrderStatus.CONFIRMED as const,
    title: "CONFIRMADO",
  },
  {
    id: OrderStatus.READY as const,
    title: "EN PREPARACIÓN",
  },
  {
    id: OrderStatus.COMPLETED as const,
    title: "ENTREGADO",
  },
] satisfies Column[];

export type OrderorderStatus = (typeof defaultCols)[number]["id"];

export function KanbanBoard({ data }: { data: Order[] }) {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [orders, setOrders] = useState<Order[]>(data);

  useEffect(() => {
    setOrders(data);
  }, [data]);

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <BoardContainer>
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <BoardColumn
                key={col.id}
                column={col}
                orders={orders.filter((order) => order.orderStatus === col.id)}
              />
            ))}
          </SortableContext>
        </BoardContainer>

        {"document" in window &&
          createPortal(
            <DragOverlay>
              {activeOrder && <OrderCard order={activeOrder} isOverlay />}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Order") {
      setActiveOrder(data.order);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveOrder(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveAOrder = activeData?.type === "Order";
    const isOverAOrder = overData?.type === "Order";

    if (!isActiveAOrder) return;

    // Arrastrando una orden sobre otra orden
    if (isActiveAOrder && isOverAOrder) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((t) => t.id === activeId);
        const overIndex = orders.findIndex((t) => t.id === overId);
        const activeOrder = { ...orders[activeIndex] }; // Crear una copia de activeOrder
        const overOrder = orders[overIndex];

        if (
          activeOrder &&
          overOrder &&
          activeOrder.orderStatus !== overOrder.orderStatus
        ) {
          activeOrder.orderStatus = overOrder.orderStatus; // Modificar la copia
          const updatedOrders = [...orders]; // Crear una copia del array de órdenes
          updatedOrders[activeIndex] = activeOrder; // Reemplazar la orden modificada
          return arrayMove(updatedOrders, activeIndex, overIndex - 1);
        }

        return arrayMove(orders, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Dejando caer una orden sobre una columna
    if (isActiveAOrder && isOverAColumn) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((t) => t.id === activeId);
        const activeOrder = { ...orders[activeIndex] }; // Crear una copia de activeOrder
        if (activeOrder) {
          activeOrder.orderStatus = overId as string; // Modificar la copia
          const updatedOrders = [...orders]; // Crear una copia del array de órdenes
          updatedOrders[activeIndex] = activeOrder; // Reemplazar la orden modificada
          return updatedOrders;
        }
        return orders;
      });
    }
  }
}
