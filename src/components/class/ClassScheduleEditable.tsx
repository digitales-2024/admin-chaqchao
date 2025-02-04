"use client";

import { ClassScheduleData } from "@/types";
import { Check, Edit2 } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    setOptions(initialOptions || []);
  }, [initialOptions]);

  useEffect(() => {
    setEditValue(
      options.find((opt) => opt.startTime === value)?.startTime || value,
    );
  }, [value, options]);

  const handleEdit = () => {
    if (isEditing) {
      // Guardar el valor editado
      const existingOption = options.find(
        (opt) => opt?.startTime === editValue,
      );
      if (existingOption) {
        onChange(existingOption.startTime || "");
      } else {
        const newOption = { startTime: editValue };
        setOptions([...options, newOption]);
        onChange(newOption.startTime);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex w-full max-w-xs flex-row items-center justify-center">
      {!isEditing ? (
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
      ) : (
        <Input
          value={editValue}
          onChange={handleInputChange}
          placeholder="HH:mm"
        />
      )}
      <Button
        onClick={handleEdit}
        type="button"
        variant="outline"
        size={"icon"}
      >
        {isEditing ? (
          <Check className="h-4 w-4" />
        ) : (
          <Edit2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
