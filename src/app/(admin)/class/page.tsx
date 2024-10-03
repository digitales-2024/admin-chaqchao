"use client";
import { useClasses } from "@/hooks/use-class";
import { format } from "date-fns";
import { useState } from "react";

import { ClassesTable } from "@/components/class/ClassesTable";
import { FilterDateClasses } from "@/components/class/FilterDateClasses";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";

export default function ClassPage() {
  const [date, setDate] = useState<Date>(new Date());
  const { allDataClasses, isLoadingDataClasses } = useClasses(
    format(date, "yyyy-MM-dd"),
  );

  if (isLoadingDataClasses) {
    return (
      <Shell>
        <HeaderPage
          title="Clases"
          description="Aquí puedes ver la lista de clases registradas."
        />
        <DataTableSkeleton columnCount={5} searchableColumnCount={1} />
      </Shell>
    );
  }

  if (!allDataClasses) {
    return (
      <Shell>
        <HeaderPage
          title="Clases"
          description="Aquí puedes ver la lista de clases registradas."
        />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-wrap justify-between gap-4">
        <HeaderPage
          title="Clases"
          description="Aquí puedes ver la lista de clases registradas."
        />
        <div className="inline-flex flex-wrap justify-end gap-2">
          <FilterDateClasses date={date} setDate={setDate} />
        </div>
      </div>
      <ClassesTable data={allDataClasses} />
    </Shell>
  );
}
