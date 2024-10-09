import { ChaqchaoOneColor } from "@/assets/icons";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CardTotal = () => {
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
        <div className="text-6xl font-bold text-white">S/.12,500</div>
        <p className="text-xs text-white/80">
          <span className="rounded-xl bg-white p-2 text-emerald-500">
            +20.1%
          </span>{" "}
          respecto al mes anterior
        </p>
      </CardContent>
    </Card>
  );
};
