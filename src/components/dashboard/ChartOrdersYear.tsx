"use client";
import { useData } from "@/hooks/use-data";
import { Order } from "@/types";
import { getStartEndDateYear } from "@/utils/getStartEndDateYear";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  count: {
    label: "Pedidos",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const ChartOrdersYear = () => {
  const { start, end } = getStartEndDateYear();
  const { data } = useData({
    startDate: start,
    endDate: end,
  });

  // Función para contar pedidos por mes
  function getOrdersByMonth(
    orders: Order[] | undefined,
    startDate: string,
    endDate: string,
  ) {
    const ordersByMonth: { [key: string]: number } = {};
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Inicializamos el conteo para los meses entre las fechas de inicio y fin
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth(); // Mes (de 0 a 11)

      const key = `${year}-${month}`;
      ordersByMonth[key] = 0; // Inicializamos en 0 para cada mes

      // Avanzar al siguiente mes
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Contamos los pedidos que están dentro del rango
    orders?.forEach((order) => {
      const pickupDate = new Date(order.pickupTime);

      // Verificar si la fecha de recogida está dentro del rango
      if (pickupDate >= start && pickupDate <= end) {
        const year = pickupDate.getFullYear();
        const month = pickupDate.getMonth(); // Los meses empiezan en 0

        const key = `${year}-${month}`;

        ordersByMonth[key]++;
      }
    });

    // Convertir el objeto en un arreglo de objetos { month: 'nombre_mes', count: cantidad }
    return Object.entries(ordersByMonth).map(([key, count]) => {
      const [year, month] = key.split("-");

      // Crear una fecha usando el año y mes para formatearla correctamente
      const date = new Date(Number(year), Number(month));

      // Usar `format` para obtener el nombre del mes
      const monthName = format(date, "MMMM yyyy", {
        locale: es,
      });

      return { month: `${monthName}`, count };
    });
  }

  const chartData = getOrdersByMonth(data, start, end);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos por Mes</CardTitle>
        <CardDescription className="capitalize">
          {format(start, "MMMM yyyy", { locale: es })} -{" "}
          {format(end, "MMMM yyyy", { locale: es })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className="capitalize"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8} fill="hsl(var(--primary))"></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
