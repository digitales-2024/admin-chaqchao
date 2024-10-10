"use client";
import { useData } from "@/hooks/use-data";
import { getStartEndDate } from "@/utils/getStartEndDate";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  totalOrdered: {
    label: "Total",
  },
} satisfies ChartConfig;

export const ChartProducts = () => {
  const { start, end } = getStartEndDate();

  const { topProducts } = useData({
    startDate: start,
    endDate: end,
  });

  const generateColors = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const opacity = 1 - i * 0.15;
      return `hsl(var(--primary) / ${opacity})`;
    });
  };

  const colors = generateColors(topProducts?.length ?? 0);

  // Solo obtener los 5 productos más vendidos
  const chartData = topProducts?.slice(0, 5).map((producto, index) => ({
    ...producto,
    fill: colors[index % colors.length],
  }));

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="pb-2">
        <CardTitle>Top Productos Más Vendidos</CardTitle>
        <CardDescription>Últimos 30 días</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <ChartContainer
            config={chartConfig}
            className="aspect-square h-[300px] w-full md:w-2/3"
          >
            <RadialBarChart
              data={chartData}
              innerRadius="30%"
              outerRadius="90%"
              startAngle={180}
              endAngle={0}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="name" />}
              />
              <PolarGrid gridType="circle" />
              <RadialBar
                dataKey="totalOrdered"
                label={{
                  position: "insideRight",
                  fill: "#fff",
                  fontWeight: "bold",
                  fontSize: 12,
                  offset: 10,
                }}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="flex w-full flex-col justify-center md:w-1/3">
            <h3 className="mb-2 text-lg font-semibold">Leyenda</h3>
            <ul className="space-y-2">
              {chartData?.map((producto) => (
                <li key={producto.id} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: producto.fill }}
                    aria-hidden="true"
                  />
                  <span className="text-sm">{producto.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando los 5 productos más vendidos en los últimos 30 días
        </div>
      </CardFooter>
    </Card>
  );
};
