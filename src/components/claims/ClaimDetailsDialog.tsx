"use client";

import { ClaimDetails } from "@/types/claim";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClaimDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  claim: ClaimDetails;
}

export const ClaimDetailsDialog = ({
  open,
  onClose,
  claim,
}: ClaimDetailsDialogProps) => {
  const {
    claimantName,
    claimantAddress,
    claimantPhone,
    documentNumber,
    claimantEmail,
    assetType,
    amountClaimed,
    assetDescription,
    claimDescription,
    dateClaim,
    claimantRepresentative,
  } = claim;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[95vh] max-w-[330mm] overflow-y-auto p-6"
        style={{ maxWidth: "330mm", maxHeight: "95vh" }}
      >
        <DialogHeader>
          <DialogTitle>Detalles del Reclamo</DialogTitle>
        </DialogHeader>
        <form className="w-full max-w-7xl rounded-md border border-gray-300 bg-white p-4 md:p-6 lg:p-8">
          <div className="mb-4 border-b border-gray-300 pb-4">
            <div className="flex flex-wrap justify-between gap-6">
              <div>
                <Label className="text-lg font-bold">Libro de Reclamos</Label>
                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Label>Fecha</Label>
                    <Input
                      readOnly
                      value={new Date(dateClaim).toLocaleDateString()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 border-b border-gray-300 pb-4">
            <Label className="font-bold">
              1. Identificación del Consumidor
            </Label>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="claimantName">Nombre</Label>
                <Input id="claimantName" readOnly value={claimantName} />
              </div>
              <div>
                <Label htmlFor="claimantEmail">Correo Electrónico</Label>
                <Input id="claimantEmail" readOnly value={claimantEmail} />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="claimantEmail">Número de Documento</Label>
                <Input id="claimantEmail" readOnly value={documentNumber} />
              </div>
              <div>
                <Label htmlFor="claimantPhone">Teléfono</Label>
                <Input id="claimantPhone" readOnly value={claimantPhone} />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="claimantAddress">Dirección</Label>
                <Input id="claimantAddress" readOnly value={claimantAddress} />
              </div>
              <div>
                <Label htmlFor="claimantRepresentative">
                  Padre/Madre o Representante
                </Label>
                <Input
                  id="claimantRepresentative"
                  readOnly
                  value={claimantRepresentative || "N/A"}
                />
              </div>
            </div>
          </div>

          <div className="mb-4 border-b border-gray-300 pb-4">
            <Label className="font-bold">
              2. Identificación del Bien o Servicio
            </Label>
            <div className="mt-4">
              <Label>Tipo</Label>
              <Input readOnly value={assetType} />
            </div>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="assetDescription">Descripción</Label>
                <Input
                  id="assetDescription"
                  readOnly
                  value={assetDescription}
                />
              </div>
              <div>
                <Label htmlFor="amountClaimed">Monto Reclamado</Label>
                <Input
                  id="amountClaimed"
                  readOnly
                  value={amountClaimed ? `$${amountClaimed}` : "N/A"}
                />
              </div>
            </div>
          </div>

          <div className="mb-4 border-gray-300">
            <Label className="font-bold">3. Detalles del Reclamo</Label>
            <div className="mt-2">
              <Label htmlFor="claimDescription">Detalle</Label>
              <textarea
                id="claimDescription"
                cols={50}
                readOnly
                value={claimDescription}
                className="h-24 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
