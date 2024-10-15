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
      <TabsList>
        <TabsTrigger value="products">
          <Package className="mr-2 h-4 w-4" />
          Productos
        </TabsTrigger>
        <TabsTrigger value="orders">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Pedidos
        </TabsTrigger>
        <TabsTrigger value="trends">
          <TrendingUp className="mr-2 h-4 w-4" />
          Tendencias
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
