"use client";

import { useClaims } from "@/hooks/use-claims";
import { usePermissions } from "@/hooks/use-permissions";
import { useState, useEffect } from "react";

import { ClaimsTable } from "@/components/claims/ClaimsTable";
import { FilterDateClaims } from "@/components/claims/FilterDateClaims";
import { AccessDenied } from "@/components/common/AccessDenied";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";

export default function ClaimsPage() {
  const { hasPermission, isLoadingHas } = usePermissions();
  const hasClaimsPermission = hasPermission("CLM", ["READ"]);
  const [date, setDate] = useState<Date | null>(null);

  const { allDataClaims, isLoadingDataClaims, refetchClaims } = useClaims(
    date ? date.toISOString().split("T")[0] : undefined,
  );

  useEffect(() => {
    if (refetchClaims) {
      refetchClaims();
    }
  }, [date, refetchClaims]);

  if (isLoadingDataClaims || isLoadingHas) {
    return (
      <Shell>
        <HeaderPage
          title="Reclamos"
          description="Aquí puedes ver la lista de reclamos registrados."
        />
        <DataTableSkeleton columnCount={5} searchableColumnCount={1} />
      </Shell>
    );
  }

  if (!hasClaimsPermission) {
    return (
      <Shell>
        <HeaderPage
          title="Reclamos"
          description="Aquí puedes ver la lista de reclamos registrados."
        />
        <AccessDenied message="No tienes permisos para ver los reclamos." />
      </Shell>
    );
  }

  if (!allDataClaims) {
    return (
      <Shell>
        <HeaderPage
          title="Reclamos"
          description="Aquí puedes ver la lista de reclamos registrados."
        />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-wrap justify-between gap-4">
        <HeaderPage
          title="Reclamos"
          description="Aquí puedes ver la lista de reclamos registrados."
        />
        <div className="inline-flex flex-wrap justify-end gap-2">
          <FilterDateClaims date={date} setDate={setDate} />
        </div>
      </div>
      <ClaimsTable data={allDataClaims} />
    </Shell>
  );
}
