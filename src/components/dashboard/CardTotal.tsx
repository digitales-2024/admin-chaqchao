"use client";
import { ChaqchaoOneColor } from "@/assets/icons";
import { useData } from "@/hooks/use-data";
import { getStartEndDate } from "@/utils/getStartEndDate";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CardTotal = () => {
  const { start, end } = getStartEndDate();
  const { data } = useData({
    startDate: start,
    endDate: end,
  });
  const [totalAmountMonth, setTotalAmountMonth] = useState<number>(0);
  useEffect(() => {
    if (data) {
      const total = data.reduce(
        (acc, curr) => acc + (curr.totalAmount ?? 0),
        0,
      );
      setTotalAmountMonth(total);
    }
  }, [data]);

  const { start: startMonthPreviuos, end: endMonthPreviuos } =
    getStartEndDate(true);

  const { data: dataPreviousMonth } = useData({
    startDate: startMonthPreviuos,
    endDate: endMonthPreviuos,
  });

  const [totalAmountMonthPrevious, setTotalAmountMonthPrevious] =
    useState<number>(0);
  useEffect(() => {
    if (dataPreviousMonth) {
      const total = dataPreviousMonth.reduce(
        (acc, curr) => acc + (curr.totalAmount ?? 0),
        0,
      );
      setTotalAmountMonthPrevious(total);
    }
  }, [dataPreviousMonth]);

  // Calcule cuanto crecio o disminuyo las ventas en el mes actual respecto al mes anterior

  const [growth, setGrowth] = useState<string>("0");
  useEffect(() => {
    if (totalAmountMonthPrevious !== 0) {
      const growth =
        ((totalAmountMonth - totalAmountMonthPrevious) /
          totalAmountMonthPrevious) *
        100;

      // Si el resultado es negativo, significa que disminuyo
      if (growth < 0) {
        setGrowth(growth.toFixed(2));
      } else {
        setGrowth(`+${growth.toFixed(2)}`);
      }
    }
  }, [totalAmountMonth, totalAmountMonthPrevious]);

  return (
    <Card className="relative flex flex-col overflow-hidden border-none bg-chaqchao-midning-green">
      <ChaqchaoOneColor className="absolute -right-24 -top-12 size-80 fill-white/10" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium text-white">
          Ventas Totales
        </CardTitle>
        <span className="text-6xl text-muted-foreground">S/.</span>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end gap-10">
        <div className="text-6xl font-bold text-white">
          S/{" "}
          <CountUp
            end={Number(totalAmountMonth.toFixed(2))}
            decimals={totalAmountMonth > 1000 ? 0 : 2}
          />
        </div>
        <p className="text-xs text-white/80">
          <span className="rounded-xl bg-white p-2 text-emerald-500">
            {growth}%
          </span>{" "}
          respecto al mes anterior
        </p>
      </CardContent>
    </Card>
  );
};
