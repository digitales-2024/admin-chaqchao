import { ShoppingBag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CardNewOrders = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pedidos Nuevos</CardTitle>
        <ShoppingBag className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <span className="text-emerald-500">+</span>573
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500">+201</span> respecto a la semana
          pasada
        </p>
      </CardContent>
    </Card>
  );
};
