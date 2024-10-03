"use client";
"use memo";

import { ClassesDataAdmin } from "@/types";
import { generateColors } from "@/utils/generateColors";
import { useMemo } from "react";

import { DataTableExpanded } from "@/components/data-table/DataTableExpanded";

import { ClassesDescription } from "./ClassesDescription";
import { classesTableColumns } from "./ClassesTableColumns";
import { ClassesTableToolbarActions } from "./ClassesTableToolbarActions";

export const ClassesTable = ({ data }: { data: ClassesDataAdmin[] }) => {
  // Obtener lenguajes únicos
  const uniqueLanguage = useMemo(() => {
    return Array.from(
      new Set(
        data.map((item) => item.classes.map((c) => c.languageClass)).flat(),
      ),
    );
  }, [data]);

  // Generar colores basados en la cantidad de lenguajes únicos
  const colors = useMemo(
    () => generateColors(uniqueLanguage.length),
    [uniqueLanguage],
  );

  const columns = useMemo(
    () => classesTableColumns(colors, uniqueLanguage),
    [colors, uniqueLanguage],
  );

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
