"use client";

import { ClassScheduleData } from "@/types";
import React, { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditableSelectProps {
  options: Pick<ClassScheduleData, "startTime">[];
  value: string;
  onChange: (value: string) => void;
}

export default function ClassScheduleEditable({
  options: initialOptions = [],
  value = "",
  onChange,
}: EditableSelectProps) {
  const [options, setOptions] =
    useState<Partial<ClassScheduleData>[]>(initialOptions);

  useEffect(() => {
    setOptions(initialOptions || []);
  }, [initialOptions]);

  return (
    <div className="flex w-full max-w-xs flex-row items-center justify-center">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una opción" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.startTime} value={option.startTime || ""}>
              {option.startTime}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
