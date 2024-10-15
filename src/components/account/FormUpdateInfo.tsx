import { useProfile } from "@/hooks/use-profile";
import { updateInfoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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

export interface FormUpdateInfoProps {
  email?: string;
  name?: string;
  phone?: string;
}

export const FormUpdateInfo = () => {
  const [formActive, setFormActive] = useState(false);

  const { user, onUpdate, isLoading, isSuccess, refetch } = useProfile();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormUpdateInfoProps>({
    resolver: zodResolver(updateInfoSchema),
    values: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      email: user?.email ?? "",
    },
  });

  const isFormActive =
    user?.name !== watch("name") || user?.phone !== watch("phone");

  useEffect(() => {
    setFormActive(isFormActive);
  }, [isFormActive, watch, user?.name, user?.phone]);

  const submitForm = (data: FormUpdateInfoProps) => {
    const updateData = {
      id: user?.id,
      roles: user?.roles.map((role) => role.id) ?? [],
      name: data.name ?? "",
      phone: data?.phone ?? "",
    };
    onUpdate(updateData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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

            <Input
              id="email"
              placeholder="john.doe@example.com"
              {...register("email")}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Tu nombre completo"
                {...register("name")}
              />
              {errors.name?.message && (
                <span className="text-xs text-red-500">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                placeholder="+51 123 456 789"
                {...register("phone")}
              />
              {errors.phone?.message && (
                <span className="text-xs text-red-500">
                  {errors.phone?.message}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!formActive || isLoading}>
            {isLoading ? "Actualizando..." : "Actualizar información"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
