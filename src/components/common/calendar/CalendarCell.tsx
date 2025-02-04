import {
  type CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { Minus } from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate,
    isUnavailable,
  } = useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isDateToday = isToday(date, getLocalTimeZone());

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={cn("relative px-0.5 py-0.5", isFocusVisible ? "z-10" : "z-0")}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="group size-14 rounded-md outline-none"
      >
        <div
          className={cn(
            "flex size-full items-center justify-center rounded-md",
            "text-sm font-semibold text-gray-900",
            isDisabled
              ? isDateToday
                ? "cursor-defaut"
                : "cursor-defaut font-thin text-gray-300"
              : "cursor-pointer bg-gray-100",
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible &&
              "group-focus:z-2 ring-1 ring-gray-200 ring-offset-1",
            // Darker selection background for the start and end.
            isSelected && "bg-gray-900 text-gray-100",
            // Hover state for non-selected cells.
            !isSelected && !isDisabled && "hover:ring-2 hover:ring-gray-800",
            // isDateToday && "bg-gray-1 text-primary ring-0 ring-offset-0",
            isUnavailable && "bg-gray-50 text-gray-300",
          )}
        >
          {isUnavailable && (
            <Minus className="absolute size-full" strokeWidth={0.5} />
          )}
          <div className="flex flex-col items-center justify-center">
            {formattedDate}
            {!isUnavailable && (
              <span className="text-xs font-thin text-gray-300">$30</span>
            )}
          </div>
          {isDateToday && (
            <div
              className={cn(
                "absolute left-1/2 top-1 size-1.5 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-gray-900",
                isSelected && "bg-gray-100",
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
