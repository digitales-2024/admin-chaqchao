import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { FilterDate } from "@/components/orders/FilterDate";
import { FilterStatus } from "@/components/orders/FilterStatus";
import { TableOrders } from "@/components/orders/TableOrders";

export default function PagerOrders() {
  return (
    <Shell>
      <div className="flex flex-wrap justify-between gap-4">
        <HeaderPage title="Pedidos" />
        {/* filter */}
        <div className="inline-flex flex-wrap justify-end gap-2">
          <FilterStatus />
          <FilterDate />
        </div>
      </div>
      <TableOrders />
    </Shell>
  );
}
