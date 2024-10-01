"use client";
import { ListFilter } from "lucide-react";
import { useState } from "react";

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

enum Status {
  all = "todos",
  wait = "espera",
  preparation = "preparación",
  ready = "listo",
}

export const FilterStatus = () => {
  const [filterStatus, setFilterStatus] = useState<Status>(Status.all);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex w-48 justify-start gap-1"
        >
          <ListFilter className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="sr-only not-sr-only inline-flex gap-2 whitespace-nowrap">
            Estado: <span className="font-bold capitalize">{filterStatus}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Estado</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value as Status)}
        >
          <DropdownMenuRadioItem value={Status.all}>
            Todos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Status.wait}>
            Espera
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Status.preparation}>
            Preparación
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={Status.ready}>
            Listo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
