"use client";
import { useProfile } from "@/hooks/use-profile";
import { updateSecuritySchema } from "@/schemas/account/updateSecuritySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { InputPassword } from "../common/forms";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

export interface FormUpdateSecurityProps {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const FormUpdateSecurity = () => {
  const [formIsActive, setFormIsActive] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormUpdateSecurityProps>({
    resolver: zodResolver(updateSecuritySchema),
  });
  const isFormActive =
    watch("password") !== "" ||
    watch("newPassword") !== "" ||
    watch("confirmPassword") !== "";

  useEffect(() => {
    setFormIsActive(isFormActive);
  }, [watch, isFormActive]);

  const { onUpdatePassword, isLoadingUpdatePassword } = useProfile();

  return (
    <form onSubmit={handleSubmit(onUpdatePassword)}>
      <Card>
        <CardHeader>
          <CardTitle>Configuración de seguridad</CardTitle>
          <CardDescription>
            Administrar el usuario es preferencias de seguridad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Contraseña actual</Label>
            <InputPassword id="currentPassword" {...register("password")} />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <InputPassword id="newPassword" {...register("newPassword")} />
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirmar la nueva contraseña
            </Label>
            <InputPassword
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={!formIsActive || isLoadingUpdatePassword}
          >
            {isLoadingUpdatePassword
              ? "Actualizando la contraseña..."
              : "Actualizar la contraseña"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
