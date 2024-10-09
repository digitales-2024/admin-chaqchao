"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOrders } from "@/hooks/use-orders";
import { Order } from "@/types";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useCallback, useEffect, useRef, useState } from "react";

import Column from "./Column";

interface KanbanBoardProps {
  data: Order[];
  setOpenDetailsOrder: (value: boolean) => void;
  setSelectedOrder: (value: Order | null) => void;
}

export default function KanbanBoard({
  data,
  setOpenDetailsOrder,
  setSelectedOrder,
}: KanbanBoardProps) {
  const boardStatus = ["CONFIRMED", "READY", "COMPLETED"];
  const { onOrderStatusUpdate, isLoadingUpdateOrderStatus } = useOrders();
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Estado local para mantener una copia optimista de los pedidos
  const [tempOrders, setTempOrders] = useState<Order[]>(data);

  useEffect(() => {
    setTempOrders(data);
  }, [data]);

  // Usamos una referencia para controlar si estamos actualizando en la base de datos
  const isUpdatingRef = useRef(false);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return; // Si no hay destino, salir de la función

      const destinationColumn = result.destination.droppableId;
      const draggedOrderId = result.draggableId;

      // Buscamos la orden que se está moviendo
      const orderToUpdate = tempOrders.find(
        (order) => order.id === draggedOrderId,
      );
      if (!orderToUpdate || orderToUpdate.orderStatus === destinationColumn)
        return;

      // Actualizamos de forma optimista el estado temporal
      const updatedTempOrders = tempOrders.map((order) =>
        order.id === draggedOrderId
          ? { ...order, orderStatus: destinationColumn }
          : order,
      );
      setTempOrders(updatedTempOrders);

      // Iniciamos la actualización de la base de datos si no estamos ya actualizando
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true; // Marcamos que estamos actualizando

        // Actualizamos el estado de la orden en la base de datos
        onOrderStatusUpdate(draggedOrderId, destinationColumn);

        // Una vez que se actualiza, liberamos el flag
        setTimeout(() => {
          isUpdatingRef.current = false; // Marcamos que la actualización ha terminado
        }, 500); // Usamos un pequeño delay para evitar updates inmediatos seguidos
      }
    },
    [tempOrders, onOrderStatusUpdate],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="dashboard"
        type="COLUMN"
        direction={isMobile ? "vertical" : "horizontal"}
        isDropDisabled={isLoadingUpdateOrderStatus} // Deshabilitar mientras está actualizando
      >
        {(provided) => (
          <ul
            className="grid gap-3 md:grid-cols-3"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boardStatus.map((key, index) => (
              <Column
                setOpenDetailsOrder={setOpenDetailsOrder}
                setSelectedOrder={setSelectedOrder}
                key={key}
                index={index}
                listTitle={key}
                listOfOrders={tempOrders.filter(
                  (order) => order.orderStatus === key,
                )}
              />
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
