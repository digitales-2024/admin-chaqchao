"use client";
import { LogoChaqchao } from "@/assets/icons";
import {
  useCreateBusinessConfig,
  useUpdateBusinessConfig,
  useBussinessConfig,
} from "@/hooks/use-business-config";
import { useBusinessHours } from "@/hooks/use-business-hours";
import {
  CreateBusinessConfigSchema,
  businessConfigSchema,
} from "@/schemas/businessInformation/createBusinessConfigSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { BusinessTabs } from "@/components/business-config/BusinessTabs";
import { TitleSecction } from "@/components/common/text/TitleSecction";

const HeaderPage = () => (
  <div className="mb-6">
    <TitleSecction text="Configuración de la Empresa" />
    <span className="text-sm text-slate-600">
      Complete la información de su empresa y configure su horario de atención.
    </span>
  </div>
);

export default function BusinessInformationPage() {
  const { dataBusinessConfigAll, error, isLoading } = useBussinessConfig();
  const { onCreateBusinessConfig } = useCreateBusinessConfig();
  const { onUpdateBusinessConfig } = useUpdateBusinessConfig();
  const {
    dataBusinessHoursAll,
    error: errorBusinessHours,
    isLoading: isLoadingBusinessHours,
  } = useBusinessHours();
  const form = useForm<CreateBusinessConfigSchema>({
    resolver: zodResolver(businessConfigSchema),
    defaultValues: {
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

  if (isLoading || isLoadingBusinessHours) {
    return <div>Cargando...</div>;
  }

  if (error || errorBusinessHours) {
    return <div>Error al cargar la configuración de negocio</div>;
  }

  const daysOfWeek = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
  };

  const businessHoursArray = dataBusinessHoursAll?.businessHours || [];

  return (
    <div className="container mx-auto py-10">
      <HeaderPage />
      <div className="flex items-start space-x-8">
        <LogoChaqchao className="mt-12 size-72" />
        <div className="flex-grow">
          <BusinessTabs
            form={form}
            handleSubmit={handleSubmit}
            daysOfWeek={daysOfWeek}
            businessHoursArray={businessHoursArray}
          />
        </div>
      </div>
    </div>
  );
}
