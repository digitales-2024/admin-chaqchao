import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CardNewClients = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
        <Users className="h-4 w-4 text-cyan-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <span className="text-cyan-500">+</span>15
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-cyan-500">+12%</span> respecto al mes anterior
        </p>
      </CardContent>
    </Card>
  );
};
