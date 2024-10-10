import { format } from "date-fns";

/**
 * Obtener la fecha de inicio y fin de la semana o la semana anterior
 *  @param weekPreviuos  Si es true, obtiene la semana anterior
 * @returns {start: string, end: string}
 */
export const getStartEndDateWeek = (
  weekPreviuos = false,
): {
  start: string;
  end: string;
} => {
  if (weekPreviuos) {
    const now = new Date();
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() - 6,
    );
    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay(),
    );

    return {
      start: format(start, "yyyy-MM-dd"),
      end: format(end, "yyyy-MM-dd"),
    };
  }

  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay(),
  );
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + 6,
  );

  return { start: format(start, "yyyy-MM-dd"), end: format(end, "yyyy-MM-dd") };
};
