import { CardCalendar } from "@/components/dashboard/CardCalendar";
import { CardNewClients } from "@/components/dashboard/CardNewClients";
import { CardNewOrders } from "@/components/dashboard/CardNewOrders";
import { CardTotal } from "@/components/dashboard/CardTotal";
import { ChartOrderDay } from "@/components/dashboard/ChartOrderDay";
import { ChartOrdersYear } from "@/components/dashboard/ChartOrdersYear";
import { ChartProducts } from "@/components/dashboard/ChartProducts";
import { Greeting } from "@/components/dashboard/Greeting";

import AdminLayout from "./(admin)/layout";

export default function Home() {
  return (
    <AdminLayout>
      <Greeting />
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardTotal />
        <div className="grid grid-cols-1 grid-rows-2 gap-6">
          <CardNewOrders />
          <CardNewClients />
        </div>
        <CardCalendar />
      </div>
      <div className="mb-8 grid grid-cols-1">
        <ChartOrderDay />
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartOrdersYear />
        <ChartProducts />
      </div>
    </AdminLayout>
  );
}
