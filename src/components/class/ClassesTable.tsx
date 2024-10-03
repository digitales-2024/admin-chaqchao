"use client";
"use memo";

import { ClassesDataAdmin } from "@/types";
import { useMemo } from "react";

import { DataTableExpanded } from "@/components/data-table/DataTableExpanded";

import { ClassesDescription } from "./ClassesDescription";
import { classesTableColumns } from "./ClassesTableColumns";
import { ClassesTableToolbarActions } from "./ClassesTableToolbarActions";

export const ClassesTable = ({ data }: { data: ClassesDataAdmin[] }) => {
  const columns = useMemo(() => classesTableColumns(), []);

  return (
    <DataTableExpanded
      data={data}
      columns={columns}
      getSubRows={(row) => row.classes as unknown as ClassesDataAdmin[]}
      toolbarActions={<ClassesTableToolbarActions />}
      placeholder="Buscar clases..."
      renderExpandedRow={(row) => <ClassesDescription row={row} />}
    />
  );
};
