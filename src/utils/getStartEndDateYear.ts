import { format } from "date-fns";

/**
 * Obtiene la fecha de inicio y actual del año actual
 * @returns {start: string, end: string} - Fecha de inicio y actual del año actual
 */
export const getStartEndDateYear = (): {
  start: string;
  end: string;
} => {
  const now = new Date();
  const start = format(new Date(now.getFullYear(), 0, 1), "yyyy-MM-dd");
  const end = format(
    new Date(now.getFullYear(), now.getMonth() + 1, 0),
    "yyyy-MM-dd",
  );

  return { start, end };
};
