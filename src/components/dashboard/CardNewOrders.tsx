"use client";
import { useData } from "@/hooks/use-data";
import { getStartEndDateWeek } from "@/utils/getStartEndDateWeek";
import { ShoppingBag, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CardNewOrders = () => {
  const { start, end } = getStartEndDateWeek();

  // Fecha de la semana anterior
  const { start: startWeekPrevious, end: endWeekPrevious } =
    getStartEndDateWeek(true);

  const { data } = useData({
    startDate: start,
    endDate: end,
  });

  const { data: dataPreviousWeek } = useData({
    startDate: startWeekPrevious,
    endDate: endWeekPrevious,
  });

  const [totalOrders, setTotalOrders] = useState<number>(0);
  useEffect(() => {
    if (data) {
      setTotalOrders(data.length);
    }
  }, [data]);

  const [totalOrdersPreviousWeek, setTotalOrdersPreviousWeek] =
    useState<number>(0);
  useEffect(() => {
    if (dataPreviousWeek) {
      setTotalOrdersPreviousWeek(dataPreviousWeek.length);
    }
  }, [dataPreviousWeek]);

  // Calcule cuanto crecio o disminuyo las ventas en semana actual respecto a la semana anterior
  const [growth, setGrowth] = useState<string>("0");
  useEffect(() => {
    if (totalOrdersPreviousWeek !== 0) {
      const growth =
        ((totalOrders - totalOrdersPreviousWeek) / totalOrdersPreviousWeek) *
        100;

      // Si el resultado es negativo, significa que disminuyo
      if (growth < 0) {
        setGrowth(growth.toFixed(0));
      } else {
        setGrowth(`+${growth.toFixed(0)}`);
      }
    }
  }, [totalOrders, totalOrdersPreviousWeek]);

  return (
    <Card>
      <CardHeader className="z-10 flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-sm font-medium">Pedidos Nuevos</CardTitle>
        <div className="rounded-md bg-emerald-100 p-3">
          <ShoppingBag className="h-4 w-4 text-emerald-500" />
        </div>
      </CardHeader>
      <CardContent className="z-10 space-y-2">
        <div className="text-4xl font-bold">
          <span className="text-emerald-500">+ </span>
          <CountUp end={totalOrders} />
        </div>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn("inline-flex items-center gap-1", {
              "text-emerald-500": growth.charAt(0) === "+",
              "text-rose-500": growth.charAt(0) === "-",
            })}
          >
            {growth}%
            <span>
              {growth.charAt(0) === "+" ? (
                <TrendingUp strokeWidth={1} />
              ) : (
                <TrendingDown strokeWidth={1} />
              )}
            </span>
          </span>{" "}
          respecto a la semana pasada
        </p>
      </CardContent>
    </Card>
  );
};
