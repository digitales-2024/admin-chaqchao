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
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const pickedUpOrderColumn = useRef<OrderorderStatus | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [orders, setOrders] = useState<Order[]>(data);

  useEffect(() => {
    setOrders(data);
  }, [data]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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

  function getDraggingOrderData(
    orderId: UniqueIdentifier,
    orderStatus: OrderorderStatus,
  ) {
    const ordersInColumn = orders.filter(
      (order) => order.orderStatus === orderStatus,
    );
    const orderPosition = ordersInColumn.findIndex(
      (order) => order.id === orderId,
    );
    const column = columns.find((col) => col.id === orderStatus);
    return {
      ordersInColumn,
      orderPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startOrderorderStatusx = columnsId.findIndex(
          (id) => id === active.id,
        );
        const startColumn = columns[startOrderorderStatusx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startOrderorderStatusx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === "Order") {
        pickedUpOrderColumn.current = active.data.current.order
          .orderStatus as OrderorderStatus;
        const { ordersInColumn, orderPosition, column } = getDraggingOrderData(
          active.id,
          pickedUpOrderColumn.current,
        );
        return `Picked up Order ${
          active.data.current.order.id
        } at position: ${orderPosition + 1} of ${
          ordersInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overOrderorderStatusx = columnsId.findIndex(
          (id) => id === over.id,
        );
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overOrderorderStatusx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "Order" &&
        over.data.current?.type === "Order"
      ) {
        const { ordersInColumn, orderPosition, column } = getDraggingOrderData(
          over.id,
          over.data.current.order.orderStatus as OrderorderStatus,
        );
        if (
          over.data.current.order.orderStatus !== pickedUpOrderColumn.current
        ) {
          return `Order ${
            active.data.current.order.id
          } was moved over column ${column?.title} in position ${
            orderPosition + 1
          } of ${ordersInColumn.length}`;
        }
        return `Order was moved over position ${orderPosition + 1} of ${
          ordersInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpOrderColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === "Order" &&
        over.data.current?.type === "Order"
      ) {
        const { ordersInColumn, orderPosition, column } = getDraggingOrderData(
          over.id,
          over.data.current.order.orderStatus as OrderorderStatus,
        );
        if (
          over.data.current.order.orderStatus !== pickedUpOrderColumn.current
        ) {
          return `Order was dropped into column ${column?.title} in position ${
            orderPosition + 1
          } of ${ordersInColumn.length}`;
        }
        return `Order was dropped into position ${orderPosition + 1} of ${
          ordersInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpOrderColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpOrderColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <>
      <DndContext
        accessibility={{
          announcements,
        }}
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
              {activeColumn && (
                <BoardColumn
                  isOverlay
                  column={activeColumn}
                  orders={orders.filter(
                    (order) => order.orderStatus === activeColumn.id,
                  )}
                />
              )}
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
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Order") {
      setActiveOrder(data.order);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
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
