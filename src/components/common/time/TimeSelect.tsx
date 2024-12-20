import { Pencil } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { TimeInput } from "./TimeInput";
import { TimeSelectDropdown } from "./TimeSelectDropdown";

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export function TimeSelect({ value, onChange, className }: TimeSelectProps) {
  const [isManualInput, setIsManualInput] = React.useState(false);
  const [manualValue, setManualValue] = React.useState(value);

  const toggleInput = () => {
    setIsManualInput(!isManualInput);
    if (!isManualInput) {
      setManualValue(value);
    }
  };

  const handleManualChange = (time: string) => {
    setManualValue(time);
    onChange(time);
  };

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {isManualInput ? (
        <TimeInput value={manualValue} onChange={handleManualChange} />
      ) : (
        <TimeSelectDropdown value={value} onChange={onChange} />
      )}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleInput}
        className="h-9 w-9"
        title={isManualInput ? "Switch to select" : "Switch to manual input"}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}
