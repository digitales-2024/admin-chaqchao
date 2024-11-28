"use client";
"use memo";

import { ClaimDetails } from "@/types/claim";
import { useState, useMemo } from "react";

import { DataTableExpanded } from "@/components/data-table/DataTableExpanded";

import { ClaimDetailsDialog } from "./ClaimDetailsDialog";
import { claimsTableColumns } from "./ClaimsTableColumns";

interface ClaimsTableProps {
  data: ClaimDetails[];
}

export const ClaimsTable = ({ data }: ClaimsTableProps) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ClaimDetails | null>(null);

  const columns = useMemo(() => claimsTableColumns(), []);

  return (
    <>
      <DataTableExpanded
        data={data}
        columns={columns}
        placeholder="Buscar reclamos..."
        onClickRow={(row) => {
          setOpenDetailsDialog(true);
          setSelectedClaim(row);
        }}
      />
      {selectedClaim && (
        <ClaimDetailsDialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          claim={selectedClaim}
        />
      )}
    </>
  );
};
