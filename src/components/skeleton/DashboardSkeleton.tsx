"use client";

import { usePathname } from "next/navigation";

import { Shell } from "../common/Shell";
import { DataTableSkeleton } from "../data-table/DataTableSkeleton";
import AdminPanelLayout from "../layouts/AdminPanelLayout";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function DashboardSkeleton() {
  const path = usePathname() ?? "";

  if (path === "/") {
    return (
      <AdminPanelLayout>
        <Card className="border-none">
          <Shell>Cargando dashboard</Shell>
        </Card>
      </AdminPanelLayout>
    );
  }
  return (
    <AdminPanelLayout>
      <Card className="border-none p-8">
        <Shell>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-full max-w-64" />
            <Skeleton className="h-6 w-full max-w-96" />
          </div>
          <DataTableSkeleton columnCount={5} />
        </Shell>
      </Card>
    </AdminPanelLayout>
  );
}
