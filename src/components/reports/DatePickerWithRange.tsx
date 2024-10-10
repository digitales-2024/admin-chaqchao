import React from "react";

import { DateRangePicker } from "../common/date-range-picker/date-range-picker";

interface DatePickerWithRangeProps {
  value: { from: string; to: string | undefined } | undefined;
  onChange: (value: { from: string; to: string | undefined }) => void;
}

export function DatePickerWithRange({
  value,
  onChange,
}: DatePickerWithRangeProps) {
  const handleUpdate = (values: {
    range: { from: Date; to: Date | undefined };
  }) => {
    const formattedFrom = values.range.from.toISOString().split("T")[0];
    const formattedTo = values.range.to
      ? values.range.to.toISOString().split("T")[0]
      : "";

    onChange({
      from: formattedFrom,
      to: formattedTo || undefined,
    });
  };

  return (
    <div>
      <DateRangePicker
        onUpdate={handleUpdate}
        initialDateFrom={value?.from || "2023-01-01"}
        initialDateTo={value?.to || "2023-12-31"}
        align="start"
        locale="es-ES"
      />
    </div>
  );
}
