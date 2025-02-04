"use client";

import { ClaimDetails } from "@/types/claim";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { User, MailIcon, PhoneIcon, Calendar, DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Función para formatear la moneda
const formatCurrency = (amount: string | undefined) => {
  if (!amount || isNaN(parseFloat(amount))) return "N/A";
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
};

export const ClaimsDescription = ({ row }: { row: ClaimDetails }) => {
  const {
    claimantName,
    claimantEmail,
    claimantPhone,
    dateClaim,
    assetDescription,
    claimDescription,
    amountClaimed,
  } = row;

  return (
    <div className="space-y-4 p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">
            Información del Reclamante
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium capitalize">
              {claimantName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="h-5 w-5 text-gray-600" />
            <span className="text-sm">{claimantEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-5 w-5 text-gray-600" />
            <span className="text-sm">{claimantPhone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Detalles del reclamo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">
            Detalles del Reclamo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium">
              Fecha: {format(parseISO(dateClaim), "PPP", { locale: es })}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700">
              Descripción del Activo:
            </h3>
            <p className="text-sm text-gray-600">{assetDescription}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700">
              Descripción del Reclamo:
            </h3>
            <p className="text-sm text-gray-600">{claimDescription}</p>
          </div>
          {amountClaimed && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">
                Monto Reclamado: {formatCurrency(amountClaimed)}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
