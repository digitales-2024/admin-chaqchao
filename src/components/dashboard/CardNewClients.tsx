"use client";
import { useData } from "@/hooks/use-data";
import { getStartEndDate } from "@/utils/getStartEndDate";
import { TrendingDown, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CardNewClients = () => {
  const { start, end } = getStartEndDate();
  const { start: startMonthPrevious, end: endMonthPrevious } =
    getStartEndDate(true);

  const { newClients } = useData({
    startDate: start,
    endDate: end,
  });

  const { newClients: newClientsMonthPrevious } = useData({
    startDate: startMonthPrevious,
    endDate: endMonthPrevious,
  });

  const [totalNewClients, setTotalNewClients] = useState<number>(0);
  useEffect(() => {
    if (newClients) {
      setTotalNewClients(newClients.length);
    }
  }, [newClients]);

  const [totalNewClientsMonthPrevious, setTotalNewClientsMonthPrevious] =
    useState<number>(0);

  useEffect(() => {
    if (newClientsMonthPrevious) {
      setTotalNewClientsMonthPrevious(newClientsMonthPrevious.length);
    }
  }, [newClientsMonthPrevious]);

  const [growth, setGrowth] = useState<string>("0");
  useEffect(() => {
    if (totalNewClientsMonthPrevious !== 0) {
      const growth =
        ((totalNewClients - totalNewClientsMonthPrevious) /
          totalNewClientsMonthPrevious) *
        100;

      if (growth < 0) {
        setGrowth(growth.toFixed(0));
      } else {
        setGrowth(`+${growth.toFixed(0)}`);
      }
    }
  }, [totalNewClients, totalNewClientsMonthPrevious]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
        <div className="rounded-md bg-cyan-100 p-3">
          <Users className="size-4 text-cyan-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-4xl font-bold">
          <span className="text-cyan-500">+ </span>
          <CountUp end={totalNewClients} />
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
              ) : growth.charAt(0) === "0" ? null : (
                <TrendingDown strokeWidth={1} />
              )}
            </span>
          </span>{" "}
          respecto al mes anterior
        </p>
      </CardContent>
    </Card>
  );
};
