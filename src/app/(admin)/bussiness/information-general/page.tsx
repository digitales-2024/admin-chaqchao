"use client";
import { LogoChaqchao } from "@/assets/icons";
import {
  useCreateBusinessConfig,
  useUpdateBusinessConfig,
  useBussinessConfig,
} from "@/hooks/use-business-config";
import {
  CreateBusinessConfigSchema,
  businessConfigSchema,
} from "@/schemas/businessInformation/createBusinessConfigSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { BusinessHourPopover } from "@/components/business-config/BusinessHourPopover";
import { CreateBusinessConfigForm } from "@/components/business-config/CreateBusinessConfigForm";
import { TitleSecction } from "@/components/common/text/TitleSecction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar la configuración de negocio</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <HeaderPage />
      <div className="flex items-start space-x-8">
        <LogoChaqchao className="mt-12 size-72" />
        <div className="flex-grow">
          <Tabs defaultValue="information" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="information">Información</TabsTrigger>
              <TabsTrigger value="schedule">Horario</TabsTrigger>
            </TabsList>
            <TabsContent value="information">
              <Card>
                <CardHeader>
                  <CardTitle>Información</CardTitle>
                  <CardDescription>
                    Ingrese los detalles de su empresa a continuación.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateBusinessConfigForm
                    form={form}
                    onSubmit={handleSubmit}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Horario</CardTitle>
                  <CardDescription>
                    Configure el horario de atención de su empresa.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                    "Domingo",
                  ].map((day) => (
                    <div key={day} className="flex items-center space-x-4">
                      <Label className="w-24">{day}</Label>
                      <BusinessHourPopover day={day} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
