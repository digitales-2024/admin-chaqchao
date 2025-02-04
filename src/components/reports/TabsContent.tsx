import { Package, ShoppingCart, TrendingUp } from "lucide-react";
import React from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReportTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: React.ReactNode;
}

export function ReportTabs({
  activeTab,
  setActiveTab,
  children,
}: ReportTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="orders">
          <ShoppingCart className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate text-ellipsis">Pedidos</span>
        </TabsTrigger>
        <TabsTrigger value="products">
          <Package className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate text-ellipsis">Productos de Pedidos</span>
        </TabsTrigger>
        <TabsTrigger value="trends">
          <TrendingUp className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate text-ellipsis">Productos en Tendencia</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
