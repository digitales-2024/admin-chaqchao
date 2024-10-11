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
          <Shell>
            <Skeleton className="h-10 w-full max-w-64" />
            <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_2fr]">
              <Skeleton className="h-full w-full" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid grid-cols-1 grid-rows-2 gap-6">
                  <Skeleton className="h-60 w-full" />
                  <Skeleton className="h-60 w-full" />
                </div>
                <Skeleton className="h-full w-full" />
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1">
              <Skeleton className="h-60 w-full" />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-60 w-full" />
            </div>
          </Shell>
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
