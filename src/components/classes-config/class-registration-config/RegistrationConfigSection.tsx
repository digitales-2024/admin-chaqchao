import { useBussinessConfig } from "@/hooks/use-business-config";
import {
  useClassRegistrations,
  useCreateClassRegistration,
  useUpdateClassRegistration,
} from "@/hooks/use-class-registration";
import {
  createClassRegistrationSchema,
  CreateClassRegistrationSchema,
} from "@/schemas/classConfig/createClassRegistrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegistrationConfigSection() {
  const {
    dataClassRegistrationsAll,
    errorClassRegistrations,
    isSuccess,
    refetch,
  } = useClassRegistrations();
  const { onCreateClassRegistration } = useCreateClassRegistration();
  const { onUpdateClassRegistration } = useUpdateClassRegistration();

  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateClassRegistrationSchema>({
    resolver: zodResolver(createClassRegistrationSchema),
  });

  useEffect(() => {
    if (
      isSuccess &&
      dataClassRegistrationsAll &&
      dataClassRegistrationsAll.length > 0
    ) {
      const existingData = dataClassRegistrationsAll[0];
      setValue(
        "closeBeforeStartInterval",
        Number(existingData.closeBeforeStartInterval),
      );
      setValue(
        "finalRegistrationCloseInterval",
        Number(existingData.finalRegistrationCloseInterval),
      );
    }
  }, [isSuccess, dataClassRegistrationsAll, setValue]);

  const onSubmit = async (data: CreateClassRegistrationSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;

      try {
        if (
          isSuccess &&
          dataClassRegistrationsAll &&
          dataClassRegistrationsAll.length > 0
        ) {
          // Actualizar registro existente
          const id = dataClassRegistrationsAll[0].id;
          await onUpdateClassRegistration({ ...data, id, businessId });
        } else {
          // Crear nuevo registro
          await onCreateClassRegistration({ ...data, businessId });
        }
        refetch(); // Refrescar datos
      } catch (error) {
        // Restablecer valores del formulario a los valores originales en caso de error
        if (dataClassRegistrationsAll && dataClassRegistrationsAll.length > 0) {
          const existingData = dataClassRegistrationsAll[0];
          reset({
            closeBeforeStartInterval: Number(
              existingData.closeBeforeStartInterval,
            ),
            finalRegistrationCloseInterval: Number(
              existingData.finalRegistrationCloseInterval,
            ),
          });
        }
      }
    }
  };

  return (
    <div className="container mx-auto py-5">
      <div className="mb-8 flex items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">
            Configuración de Registro de Clases
          </h2>
          <span className="text-gray-600">
            Ingrese intervalos de registro de las clases.
          </span>
        </div>
      </div>

      {errorClassRegistrations && (
        <p className="text-red-500">
          Ocurrió un error al cargar los registros de clase.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-4">
        <div>
          <Label htmlFor="closeBeforeStartInterval">
            Intervalo de cierre antes del inicio (en minutos)
          </Label>
          <Input
            id="closeBeforeStartInterval"
            type="number"
            {...register("closeBeforeStartInterval", { valueAsNumber: true })}
          />
          {errors.closeBeforeStartInterval && (
            <p className="text-red-500">
              {errors.closeBeforeStartInterval.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="finalRegistrationCloseInterval">
            Intervalo final de cierre de registro (en minutos)
          </Label>
          <Input
            id="finalRegistrationCloseInterval"
            type="number"
            {...register("finalRegistrationCloseInterval", {
              valueAsNumber: true,
            })}
          />
          {errors.finalRegistrationCloseInterval && (
            <p className="text-red-500">
              {errors.finalRegistrationCloseInterval.message}
            </p>
          )}
        </div>
        <Button type="submit">Guardar</Button>
      </form>
    </div>
  );
}