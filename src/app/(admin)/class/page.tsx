"use client";
import { useClasses } from "@/hooks/use-class";

import { ClassesTable } from "@/components/class/ClassesTable";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";

export default function ClassPage() {
  const { allDataClasses, isLoadingDataClasses } = useClasses();

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
      <HeaderPage
        title="Clases"
        description="Aquí puedes ver la lista de clases registradas."
      />
      <ClassesTable data={allDataClasses} />
    </Shell>
  );
}
