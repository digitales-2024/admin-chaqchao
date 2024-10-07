"use client";
import { useClasses } from "@/hooks/use-class";
import { ClassesDataAdmin } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { ClassesTable } from "@/components/class/ClassesTable";
import { FilterDateClasses } from "@/components/class/FilterDateClasses";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";

export default function ClassPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [previousData, setPreviousData] = useState<ClassesDataAdmin[]>([]);
  const [newParticipants, setNewParticipants] = useState<{
    [key: string]: number;
  }>({});
  const { allDataClasses, isLoadingDataClasses } = useClasses(
    format(date, "yyyy-MM-dd"),
  );

  useEffect(() => {
    if (allDataClasses) {
      const newParticipantsCount: { [key: string]: number } = {};
      allDataClasses.forEach((classData, index) => {
        const previousClassData = previousData[index];
        if (previousClassData) {
          const difference =
            classData.totalParticipants - previousClassData.totalParticipants;
          if (difference > 0) {
            newParticipantsCount[
              classData.dateClass + classData.scheduleClass
            ] = difference;
          }
        }
      });
      setNewParticipants(newParticipantsCount);
      setPreviousData(allDataClasses);
    }
  }, [allDataClasses]);

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
      <ClassesTable data={allDataClasses} newParticipants={newParticipants} />
    </Shell>
  );
}
