"use client";
import { TOKEN } from "@/constants";
import { useUpdatePasswordMutation } from "@/redux/services/authApi";
import { updatePasswordSchema } from "@/schemas";
import { CustomErrorData, ErrorFormData } from "@/types";
import { translateError } from "@/utils/translateError";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { InputPassword } from "../common/forms";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Inputs = {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export const FormUpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const router = useRouter();

  const [updatePassword, { data, error, isLoading }] =
    useUpdatePasswordMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await updatePassword(data);
  };

  useEffect(() => {
    if (data) {
      Cookies.set(TOKEN, data.token);
      router.replace("/");
    }
  }, [data, router]);

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <Input
            placeholder="ejemplo@chaqchao.com"
            type="email"
            id="email"
            {...register("email", { required: "Este campo es requerido" })}
            className="input"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-muted-foreground">
            Contraseña
          </Label>
          <InputPassword
            placeholder="tu contraseña temporal"
            {...register("password")}
            className="hide-password-toggle pr-10"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors?.password?.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="newPassword" className="text-muted-foreground">
            Nueva contraseña
          </Label>
          <InputPassword
            placeholder="tu nueva contraseña"
            {...register("newPassword")}
            aria-invalid={errors.newPassword ? "true" : "false"}
          />
          {errors.newPassword && (
            <span className="text-sm text-red-500">
              {errors?.newPassword?.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-muted-foreground">
            Confirmar contraseña
          </Label>
          <InputPassword
            placeholder="confirma tu nueva contraseña"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors?.confirmPassword?.message}
            </span>
          )}
        </div>
        <Button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
      </form>

      {error && "data" in error && typeof error.data === "object" && (
        <Alert variant="destructive" className="flex flex-col gap-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {translateError((error.data as CustomErrorData).error)}
          </AlertTitle>
          <AlertDescription>
            {(typeof (error.data as ErrorFormData).message).toString() ===
              "array" && (error.data as ErrorFormData).message.length > 0 ? (
              <ul className="list-disc">
                {(error.data as ErrorFormData).message.map((msg, i) => (
                  <li key={i}>{translateError(msg)}</li>
                ))}
              </ul>
            ) : (
              <span>
                {translateError((error.data as CustomErrorData).message)}
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
