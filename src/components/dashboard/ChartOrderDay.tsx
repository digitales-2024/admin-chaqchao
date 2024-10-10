"use client";
import { useData } from "@/hooks/use-data";
import { getStartEndDate } from "@/utils/getStartEndDate";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  pedidos: {
    label: "Pedidos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const ChartOrderDay = () => {
  const { start, end } = getStartEndDate();

  const { data } = useData({
    startDate: start,
    endDate: end,
  });

  // Total de pedidos en cada dia del mes
  const chartData = useMemo(() => {
    if (data) {
      const dataMonth = data.reduce(
        (acc, curr) => {
          const date = new Date(curr.pickupTime).toISOString().split("T")[0];
          const index = acc.findIndex((item) => item.date === date);

          if (index === -1) {
            acc.push({
              date,
              pedidos: 0,
            });
          }

          const indexItem = acc.findIndex((item) => item.date === date);
          acc[indexItem].pedidos += 1;

          return acc;
        },
        [] as { date: string; pedidos: number }[],
      );

      // Obtener todos los días del mes
      const startDate = new Date(start);
      const endDate = new Date(end);
      const allDates = [];
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        allDates.push(new Date(d).toISOString().split("T")[0]);
      }

      // Incluir todos los días del mes en dataMonth
      allDates.forEach((date) => {
        if (!dataMonth.find((item) => item.date === date)) {
          dataMonth.push({ date, pedidos: 0 });
        }
      });

      // Ordenar el arreglo por fecha
      return dataMonth.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    }
  }, [data, start, end]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Diarios</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="pedidos"
              type="natural"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
