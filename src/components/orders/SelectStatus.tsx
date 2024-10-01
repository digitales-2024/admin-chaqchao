"use client";

import { OrderStatus } from "@/types";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectStatusProps {
  data: string;
}

const options = [
  {
    label: "Activo",
    value: OrderStatus.ACTIVE,
    color: "bg-green-500",
  },
  {
    label: "Completado",
    value: OrderStatus.COMPLETED,
    color: "bg-blue-500",
  },
  {
    label: "Pendiente",
    value: OrderStatus.PENDING,
    color: "bg-yellow-500",
  },
];

export default function SelectStatus({ data }: SelectStatusProps) {
  const [selected, setSelected] = useState<string>(data);

  const handleStatusChange = (value: string) => {
    setSelected(value);
  };

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <div className="w-[200px]">
      <Select onValueChange={handleStatusChange} value={selected}>
        <SelectTrigger className={`w-full ${selectedOption?.color} text-white`}>
          <SelectValue placeholder="Selecciona un color" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={`${option.color} text-white`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
