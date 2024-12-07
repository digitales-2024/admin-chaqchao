"use client";

import { useBussinessConfig } from "@/hooks/use-business-config";
import { useBusinessHours } from "@/hooks/use-business-hours";
import {
  CreateBusinessConfigSchema,
  businessConfigSchema,
} from "@/schemas/businessInformation/createBusinessConfigSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { BusinessTabs } from "@/components/business-config/BusinessTabs";
import { CardBussiness } from "@/components/business-config/CardBussiness";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { Skeleton } from "@/components/ui/skeleton";

const daysOfWeek = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export default function BusinessInformationPage() {
  const { dataBusinessConfigAll, error, isLoading } = useBussinessConfig();
  const { onCreateBusinessConfig } = useBussinessConfig();
  const { onUpdateBusinessConfig } = useBussinessConfig();
  const {
    dataBusinessHoursAll,
    error: errorBusinessHours,
    isLoading: isLoadingBusinessHours,
    refetch: refetchBusinessHours,
  } = useBusinessHours();

  const form = useForm<CreateBusinessConfigSchema>({
    resolver: zodResolver(businessConfigSchema),
    defaultValues: {
      ruc: "",
      businessName: "",
      contactNumber: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (dataBusinessConfigAll && dataBusinessConfigAll.length > 0) {
      const businessConfig = dataBusinessConfigAll[0];
      form.reset({
        ruc: businessConfig.ruc || "",
        businessName: businessConfig.businessName || "",
        contactNumber: businessConfig.contactNumber || "",
        email: businessConfig.email || "",
        address: businessConfig.address || "",
      });
    }
  }, [dataBusinessConfigAll, form]);

  const handleSubmit = async (data: CreateBusinessConfigSchema) => {
    if (dataBusinessConfigAll && dataBusinessConfigAll.length > 0) {
      // Actualizar configuración de negocio
      await onUpdateBusinessConfig({
        id: dataBusinessConfigAll[0].id,
        ...data,
      });
    } else {
      // Crear nueva configuración de negocio
      await onCreateBusinessConfig(data);
    }
  };

  const businessHoursArray = dataBusinessHoursAll?.businessHours || [];

  if (isLoading || isLoadingBusinessHours) {
    return (
      <Shell className="gap-4">
        <HeaderPage
          title="Configuración de la Empresa"
          description="Complete la información de su empresa y configure su horario de atención."
        />
        <div className="flex w-full gap-4">
          <Skeleton className="hidden size-72 flex-shrink-0 justify-end rounded-full sm:block" />
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col justify-between gap-2 gap-y-2 sm:flex-row">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-auto min-h-52 w-full flex-1 justify-end" />
          </div>
        </div>
      </Shell>
    );
  }

  if (error || errorBusinessHours) {
    return (
      <Shell>
        <HeaderPage
          title="Configuración de la Empresa"
          description="Complete la información de su empresa y configure su horario de atención."
        />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <>
      <HeaderPage
        title="Configuración de la Empresa"
        description="Complete la información de su empresa y configure su horario de atención."
      />
      <div className="grid grid-cols-1 items-start gap-x-6 md:grid-cols-[1fr_2fr]">
        <CardBussiness />
        <div className="flex-grow">
          <BusinessTabs
            form={form}
            handleSubmit={handleSubmit}
            daysOfWeek={daysOfWeek}
            businessHoursArray={businessHoursArray}
            refetchBusinessHours={refetchBusinessHours}
          />
        </div>
      </div>
    </>
  );
}
