import { useProfileQuery } from "@/redux/services/adminApi";
import { useUpdateUserMutation } from "@/redux/services/usersApi";
import { updateInfoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

interface FormUpdateInfoProps {
  email?: string;
  name?: string;
  phone?: string;
}

export const FormUpdateInfo = () => {
  const [formActive, setFormActive] = useState(false);

  const { data, isLoading, refetch } = useProfileQuery();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormUpdateInfoProps>({
    resolver: zodResolver(updateInfoSchema),
    values: {
      email: data?.email,
      name: data?.name,
      phone: data?.phone,
    },
  });

  const [
    updateUser,
    {
      data: dataUpdateResponse,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateUserMutation();

  const onSubmit = async (dataForm: FormUpdateInfoProps) => {
    await updateUser({
      id: data?.id,
      ...dataForm,
    });
    refetch();

    toast.promise(
      new Promise((resolve, reject) => {
        if (errorUpdate) {
          reject(errorUpdate);
        } else {
          resolve(dataUpdateResponse);
        }
      }),
      {
        loading: "Actualizando información...",
        success: "Información actualizada",
        error: "Error al actualizar la información",
      },
    );
  };

  const isFormActive =
    data?.name !== watch("name") || data?.phone !== watch("phone");

  useEffect(() => {
    setFormActive(isFormActive);
  }, [isFormActive, watch, data?.name, data?.phone]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Información general</CardTitle>
          <CardDescription>
            Actualizar la información general del usuario
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isLoading ? (
              <Skeleton className="h-[38px] w-full" />
            ) : (
              <Input
                id="email"
                placeholder="john.doe@example.com"
                {...register("email")}
                disabled
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              {isLoading ? (
                <Skeleton className="h-[38px] w-full" />
              ) : (
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  {...register("name")}
                />
              )}
              {errors.name?.message && (
                <span className="text-xs text-red-500">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              {isLoading ? (
                <Skeleton className="h-[38px] w-full" />
              ) : (
                <Input
                  id="phone"
                  placeholder="+51 123 456 789"
                  {...register("phone")}
                />
              )}
              {errors.phone?.message && (
                <span className="text-xs text-red-500">
                  {errors.phone?.message}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!formActive || isLoadingUpdate}>
            {isLoadingUpdate ? "Actualizando..." : "Actualizar información"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};