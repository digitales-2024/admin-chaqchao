"use client";

import { OrderStatus } from "@/types";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

interface SelectStatusProps {
  data: string;
}

export const optionsStatus = [
  {
    label: "Pendiente",
    value: OrderStatus.PENDING,
    color: "text-yellow-500 ring-yellow-500 focus:ring-yellow-500",
    fill: "fill-yellow-500",
  },
  {
    label: "Confirmado",
    value: OrderStatus.CONFIRMED,
    color: "text-sky-500 ring-sky-500 focus:ring-sky-500",
    fill: "fill-sky-500",
  },
  {
    label: "Listo",
    value: OrderStatus.READY,
    color: "text-emerald-500 ring-emerald-500 focus:ring-emerald-500",
    fill: "fill-emerald-500",
  },
  {
    label: "Completado",
    value: OrderStatus.COMPLETED,
    color: "text-green-500 ring-green-500 focus:ring-green-500",
    fill: "fill-green-500",
  },
  {
    label: "Cancelado",
    value: OrderStatus.CANCELLED,
    color: "text-rose-500 ring-rose-500 focus:ring-rose-500",
    fill: "fill-rose-500",
  },
];

export default function SelectStatus({ data }: SelectStatusProps) {
  const [selected, setSelected] = useState<string>(data);

  const handleStatusChange = (value: string) => {
    setSelected(value);
  };

  const selectedOption = optionsStatus.find(
    (option) => option.value === selected,
  );

  useEffect(() => {
    setSelected(data);
  }, [data]);
  return (
    <div className="w-[200px]">
      <Select onValueChange={handleStatusChange} value={selected}>
        <SelectTrigger
          className={cn("w-full rounded-2xl", selectedOption?.color)}
        >
          <div className="inline-flex w-full items-center gap-2 truncate">
            <Circle
              size={8}
              className={cn("stroke-none", selectedOption?.fill)}
            />
            <SelectValue placeholder="Selecciona un estador" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {optionsStatus.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(option?.color)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}