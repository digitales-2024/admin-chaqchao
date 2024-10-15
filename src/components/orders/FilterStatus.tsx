"use client";
import { OrderStatus } from "@/types";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  {
    label: "Todos",
    value: OrderStatus.ALL,
  },
  {
    label: "Pendiente",
    value: OrderStatus.PENDING,
  },
  {
    label: "Confirmado",
    value: OrderStatus.CONFIRMED,
  },
  {
    label: "Listo",
    value: OrderStatus.READY,
  },
  {
    label: "Completado",
    value: OrderStatus.COMPLETED,
  },
  {
    label: "Cancelado",
    value: OrderStatus.CANCELLED,
  },
];

interface FilterStatusProps {
  filterStatus: OrderStatus;
  setFilterStatus: (value: OrderStatus) => void;
}

export const FilterStatus = ({
  filterStatus,
  setFilterStatus,
}: FilterStatusProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex w-full justify-start gap-1 truncate sm:w-48"
        >
          <ListFilter className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="sr-only not-sr-only inline-flex gap-2 whitespace-nowrap">
            Estado:{" "}
            <span className="font-bold capitalize">
              {options.find((op) => op.value === filterStatus)?.label ||
                "Todos"}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Estado</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value as OrderStatus)}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
