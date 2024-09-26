import { LogoChaqchao } from "@/assets/icons";

import { Skeleton } from "@/components/ui/skeleton";

import { Card } from "../ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col gap-5">
        <Card className="flex h-[400px] w-56 animate-pulse sm:h-full sm:w-[500px]">
          {/* Sidebar */}
          <div className="hidden flex-col gap-10 border-r p-2 sm:flex">
            <div className="flex items-center justify-center gap-2">
              <LogoChaqchao className="size-6 animate-pulse" />
              <Skeleton className="h-5 w-14 animate-pulse" />
            </div>

            {/* Navigation */}
            <div className="grid gap-2">
              <Skeleton className="h-5 w-14 animate-pulse" />
              <Skeleton className="h-5 w-12 animate-pulse" />
              <Skeleton className="h-5 w-10 animate-pulse" />
              <Skeleton className="h-5 w-11 animate-pulse" />
              <Skeleton className="h-5 w-12 animate-pulse" />
            </div>
          </div>
          {/* Header */}
          <div className="flex w-full flex-col">
            <div className="flex h-10 w-full items-center justify-end gap-2 border-b p-2">
              <Skeleton className="size-6 animate-pulse rounded-full" />
              <Skeleton className="h-5 w-14 animate-pulse" />
            </div>
            <div className="flex flex-row flex-wrap gap-3 p-4">
              <Skeleton className="h-5 w-full animate-pulse" />
              <Skeleton className="h-16 w-20 animate-pulse" />
              <Skeleton className="h-16 w-20 animate-pulse" />
              <Skeleton className="h-16 w-20 animate-pulse" />
              <Skeleton className="h-16 w-20 animate-pulse" />
              <Skeleton className="h-5 w-full animate-pulse" />
              <Skeleton className="h-5 w-full animate-pulse" />
              <Skeleton className="h-5 w-full animate-pulse" />
            </div>
          </div>
        </Card>
        <span className="inline-flex animate-pulse items-center justify-center gap-2">
          Obteniendo la información ...
        </span>
      </div>
    </div>
  );
}
