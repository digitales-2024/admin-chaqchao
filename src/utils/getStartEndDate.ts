import { format } from "date-fns";

/**
 * Obtiene la fecha de inicio y fin del mes actual o del mes anterior
 * @param monthPreviuos  Si es true, obtiene el mes anterior
 * @returns {start: string, end: string}
 */
export const getStartEndDate = (
  monthPreviuos = false,
): {
  start: string;
  end: string;
} => {
  if (monthPreviuos) {
    const now = new Date();
    const start = format(
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
      "yyyy-MM-dd",
    );
    const end = format(
      new Date(now.getFullYear(), now.getMonth(), 0),
      "yyyy-MM-dd",
    );

    return { start, end };
  }

  const now = new Date();
  const start = format(
    new Date(now.getFullYear(), now.getMonth(), 1),
    "yyyy-MM-dd",
  );
  const end = format(
    new Date(now.getFullYear(), now.getMonth() + 1, 0),
    "yyyy-MM-dd",
  );

  return { start, end };
};
