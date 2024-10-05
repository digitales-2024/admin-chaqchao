import { Active, DataRef, Over } from "@dnd-kit/core";

import { ColumnDragData } from "./BoardColumn";
import { OrderDragData } from "./OrderCard";

type DraggableData = ColumnDragData | OrderDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Order") {
    return true;
  }

  return false;
}
