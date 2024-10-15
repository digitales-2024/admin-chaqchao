import { Order } from "@/types";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";

import OrderList from "./OrderList";

type ColumnProps = {
  listTitle: string;
  listOfOrders: Order[];
  index: number;
  setOpenDetailsOrder: (value: boolean) => void;
  setSelectedOrder: (value: Order | null) => void;
};

export default function Column({
  index,
  listOfOrders,
  listTitle,
  setOpenDetailsOrder,
  setSelectedOrder,
}: ColumnProps) {
  return (
    <Draggable draggableId={listTitle} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex min-w-96 flex-grow flex-col"
        >
          <OrderList
            setOpenDetailsOrder={setOpenDetailsOrder}
            setSelectedOrder={setSelectedOrder}
            listId={listTitle}
            listType="ORDER"
            listOfOrders={listOfOrders}
            isDropDisabled={false}
            listTitle={listTitle}
          />
        </div>
      )}
    </Draggable>
  );
}
