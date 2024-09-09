import { TOKEN } from "@/constants";
import { useUpdatePasswordMutation } from "@/redux/services/adminApi";
import { updateSecuritySchema } from "@/schemas/account/updateSecuritySchema";
import { CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
import { DialogUpdate } from "./DialogUpdate";

interface FormUpdateSecurityProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const FormUpdateSecurity = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormUpdateSecurityProps>({
    resolver: zodResolver(updateSecuritySchema),
  });

  const [formIsActive, setFormIsActive] = useState(false);

  const [updatePassword, { error, isLoading, data }] =
    useUpdatePasswordMutation();
  const onSubmit = async (data: FormUpdateSecurityProps) => {
    await updatePassword({
      password: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  const isFormActive =
    watch("currentPassword") !== "" ||
    watch("newPassword") !== "" ||
    watch("confirmPassword") !== "";

  useEffect(() => {
    setFormIsActive(isFormActive);
  }, [watch, isFormActive]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      Cookies.remove(TOKEN);
      router.replace("/sign-in");
    }, 1000);
  };

  const openDialog = useCallback(() => {
    if (data && !error) {
      setIsDialogOpen(true);
    }
  }, [data, error]);

  useEffect(() => {
    openDialog();
  }, [data, error, openDialog]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <InputPassword
                id="currentPassword"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <span className="text-sm text-red-500">
                  {errors.currentPassword.message}
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
                Confirmar una nueva contraseña
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
            {error && "data" in error && typeof error.data === "object" && (
              <p className="text-sm text-red-500">
                {translateError((error.data as CustomErrorData).message)}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={!formIsActive || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando la contraseña...
                </>
              ) : (
                <>Actualizar la contraseña</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <DialogUpdate
        title="Contraseña actualizada"
        description="Tu contraseña ha sido actualizada con éxito"
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </>
  );
};
